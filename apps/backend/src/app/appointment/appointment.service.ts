import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { AppointmentEntity } from './entities/appointment.entity';
import { CreateAppointmentDto } from './dtos/create-appointment-dto';
import { UserService } from '../user/user.service';
import { Status } from './enum/status.enum';
import { UpdateAppointmentDto } from './dtos/update-appointment-dto';
import { MailService } from '../mail/mail.service';
import { DoctorService } from '../doctor/doctor.service';
import moment from 'moment';
import { AbsenceScheduleService } from '../absence-schedule/absence-schedule.service';
import { runInThisContext } from 'vm';
import { MedicalHistoryService } from '../medical-history/medical-history.service';
import { CreateMedicalHistoryDto } from '../medical-history/dtos/create-medical-history.dto';
import { DoctorEntity } from '../doctor/entities/doctor.entity';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(AppointmentEntity)
    private appointmentsRepository: Repository<AppointmentEntity>,
    private userService: UserService,
    private doctorService: DoctorService,
    private mailServise: MailService,
    private absence_sheduleService: AbsenceScheduleService,
    private medical_history: MedicalHistoryService,
  ) {}

  async create(appointment: CreateAppointmentDto): Promise<AppointmentEntity> {
    try {
      const _doctor = await this.doctorService.findById(+appointment.doctor_id);
      if (!_doctor) {
        throw new Error(`The doctor doesn't exist.`);
      }

      const _patient = await this.userService.findOne(+appointment.patient_id);
      if (!_patient) {
        throw new Error(`The patient doesn't exist.`);
      }

      const _isBooked = await this.PatientisBookedOnDate(
        +appointment.patient_id,
        new Date(appointment.date_start)
      );
      if (_isBooked) {
        throw new Error(
          `The patient has already booked an appointment for this date and time`
        );
      }

      const _app = await this.appointmentsRepository.save({
        doctor: _doctor,
        patient: _patient,
        status: Status.Waiting,
        date_start: new Date(appointment.date_start),
      });

      await this.mailServise.sendNewAppointment(_app);
      const countAppAtDate = await this.countAppointmentByDoctorAtDate(
        +appointment.doctor_id,
        new Date(appointment.date_start)
      );

      if(countAppAtDate === 24) {
        await this.absence_sheduleService.create({
          id: null,
          doctor_id: +appointment.doctor_id,
          date_start: new Date(appointment.date_start),
          date_end: new Date(appointment.date_start),
          cause: 'full day'
        })
      }
      return _app;
    } catch (error) {
      throw new BadRequestException(`Can't book appointment: ${error}`);
    }
  }

  async findOne(id: number): Promise<AppointmentEntity> {
    return await this.appointmentsRepository.findOne({
      relations: ['doctor', 'patient', 'doctor.user','opinion'],
      where: { id: id },
    });
  }

  async findAllByPatient(patient_id: number): Promise<AppointmentEntity[]> {
    return await this.appointmentsRepository.find({
      relations: ['patient', 'doctor', 'doctor.user','opinion'],
      where: {
        patient: { id: patient_id },
      },
      order: {
        date_start: 'ASC',
      },
    });
  }

  async PatientisBookedOnDate(patient_id: number, date: Date): Promise<boolean> {
    try {
      const isBookedDate = await this.appointmentsRepository.findOne({
        relations: ['patient'],
        where: {
          patient: {
            id: patient_id,
          },
          date_start: date,
        },
      });
      if (isBookedDate) return true;
      return false;
    } catch (error) {
      throw new BadRequestException(`Произошла ошибка: ${error}`);
    }
  }

  async findAllByPatientForPeriod(
    patient_id: number,
    start: Date,
    finish: Date
  ): Promise<AppointmentEntity[]> {
    return await this.appointmentsRepository.find({
      relations: ['patient', 'doctor', 'doctor.user','opinion'],
      where: {
        patient: { id: patient_id },
        date_start: Between(start, finish),
      },
    });
  }

  async findBookingDate(doctor_id: number, date: Date): Promise<string[]> {
    // Устанавливаем время начала дня (00:00)
    const startDate = new Date(date);
    startDate.setHours(0, 0);

    // Устанавливаем время конца дня (23:59)
    const finishDate = new Date(date);
    finishDate.setHours(23, 59);

    const bookingdtime = await this.appointmentsRepository.find({
      relations: ['patient', 'doctor'],
      where: {
        doctor: { id: doctor_id },
        date_start: Between(startDate, finishDate),
      },
      order: {
        date_start: 'ASC',
      },
    });
    return bookingdtime.map((app) => {
      return moment(app.date_start).format('HH:mm');
    });
  }

  async findAllByDoctorStatusWaiting(
    doctor_id: number,
    date: Date
  ): Promise<AppointmentEntity[]> {
    // Устанавливаем время начала дня (00:00)
    const startDate = new Date(date);
    startDate.setHours(0, 0);

    // Устанавливаем время конца дня (23:59)
    const finishDate = new Date(date);
    finishDate.setHours(23, 59);

    return await this.appointmentsRepository.find({
      relations: ['patient', 'doctor'],
      where: {
        doctor: { id: doctor_id },
        status: Status.Waiting,
        date_start: Between(startDate, finishDate),
      },
      order: {
        date_start: 'ASC',
      },
    });
  }

  async countAppointmentByDoctorAtDate(
    doctor_id: number,
    date: Date
  ): Promise<number> {
    const _appointments = await this.findBookingDate(doctor_id, date);
    return _appointments.length;
  }

  async updateStatus(
    id: number,
    status: Status
  ): Promise<AppointmentEntity> {
    try {
        await this.appointmentsRepository.save({
          id: id,
          status: Status[status],
        });
        return await this.findOne(id);
    } catch (error) {
      throw new BadRequestException(`Произошла неизвестная ошибка при изменении статуса: ${error}`);
    }
  }

  async updateAddMedicalHistory(
    id: number,
    opinion: CreateMedicalHistoryDto
  ): Promise<AppointmentEntity> {
    try {
      const _opinion = await this.medical_history.create(opinion);
      if(_opinion) {
        await this.appointmentsRepository.save({
          id: id,
          opinion: _opinion,
          status: Status.Completed
        });
      } else {
          throw new Error(
            `Failed to create and add conclusion`
          );
      }
        return await this.findOne(id);
    } catch (error) {
      throw new BadRequestException(`Произошла ошибка при создании или добавлении заключения: ${error.message}`);
    }
  }

  async updateAppointmnent(oldApp : AppointmentEntity,newApp: UpdateAppointmentDto, doctor: DoctorEntity):Promise<AppointmentEntity> {
    try {
      const _isBooked = await this.PatientisBookedOnDate(
        oldApp.patient.id,
        new Date(newApp.date_start)
      );
      if (_isBooked) {
        throw new Error(
          `The patient has already booked an appointment for this date and time`
        );
      }

      const _app = await this.appointmentsRepository.save({
        id: oldApp.id,
        doctor: doctor,
        patient: oldApp.patient,
        status: Status.Waiting,
        date_start: new Date(newApp.date_start),
      });

      await this.mailServise.sendNewAppointment(_app);

      const countAppAtDate = await this.countAppointmentByDoctorAtDate(
        doctor.id,
        new Date(newApp.date_start)
      );

      if(countAppAtDate === 24) {
        await this.absence_sheduleService.create({
          id: null,
          doctor_id: doctor.id,
          date_start: new Date(newApp.date_start),
          date_end: new Date(newApp.date_start),
          cause: 'full day'
        })
      }

      const countOld = await this.countAppointmentByDoctorAtDate(
        oldApp.doctor.id,
        new Date(oldApp.date_start)
      );

      if(countOld === 23) {
        const _sch = await this.absence_sheduleService.findByDoctorIdAtDate(oldApp.doctor.id,new Date(oldApp.date_start));
        await this.absence_sheduleService.deleteById(_sch.id);
      }
      _app.patient.password="";
      _app.doctor.user.password='';
      return _app;

    } catch (error) {
      throw new BadRequestException(`Can't update appointment: ${error}`);
    }
  }



  async delete(app: AppointmentEntity): Promise<boolean> {
    try {
        await this.appointmentsRepository.delete({ id: app.id });

        const countAppAtDate = await this.countAppointmentByDoctorAtDate(
          app.doctor.id,
          new Date(app.date_start)
        );

        if(countAppAtDate === 23) {
          const _sch = await this.absence_sheduleService.findByDoctorIdAtDate(app.doctor.id,new Date(app.date_start));
          await this.absence_sheduleService.deleteById(_sch.id);
        }

        return true;
    } catch (error) {
      throw new BadRequestException(`Произошла ошибка при удалении записи: ${error.message}`);
    }
  }
}
