import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { AppointmentEntity } from './entities/appointment.entity';
import { CreateAppointmentDto } from './dtos/create-appointment-dto';
import { UserService } from '../user/user.service';
import { Status } from './enum/status.enum';
import { UpdateAppointmentDto } from './dtos/update-appointment-dto';
import { MailService } from '../mail/mail.service';
import { DoctorService } from '../doctor/doctor.service';


@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(AppointmentEntity)
      private appointmentsRepository: Repository<AppointmentEntity>,
      private userService: UserService,
      private doctorService: DoctorService,
      private mailServise: MailService
  ) {}

  async create (appointment: CreateAppointmentDto): Promise<AppointmentEntity> {
      try {

        const _doctor = await this.doctorService.findById(+appointment.doctor_id);
        const _patient = await this.userService.findOne(+appointment.patient_id);

        if(!_doctor || !_patient) {
          throw new BadRequestException(`Doctor or Patient doesn't exist.`);
        }

        let _app = await this.appointmentsRepository.save({
          doctor: _doctor,
          patient: _patient,
          status: Status.Waiting,
          date_start: new Date(appointment.date_start)
        })

        await this.mailServise.sendNewAppointment(_app);
        return _app
      } catch (error) {
        throw new BadRequestException(`Can't book appointment: ${error}`);
      }
  }

  async findOne(id:number): Promise<AppointmentEntity> {
    return await this.appointmentsRepository.findOne({
      relations: ["doctor","patient"],
      where: {id:id}
    });
  }

  async findAllByPatient(patient_id: number): Promise<AppointmentEntity[]> {
   return await this.appointmentsRepository.find({
          relations: ['patient','doctor'],
          where: {
            patient: {id: patient_id},
          },
          order: {
            date_start: 'ASC'
          }
        });

  }

  async findAllByPatientForPeriod(patient_id: number,start: Date, finish: Date): Promise<AppointmentEntity[]> {
    return await this.appointmentsRepository.find({
      relations: ['patient','doctor'],
      where: {
        patient: {id: patient_id},
        date_start: Between(start,finish)
      }
    })
  }

  async findAllByDoctorStatusWaiting(doctor_id:number,date: Date):Promise<Date[]>{
    // Устанавливаем время начала дня (00:00)
    const startDate = new Date(date);
    startDate.setHours(0, 0);

    // Устанавливаем время конца дня (23:59)
    const finishDate = new Date(date);
    finishDate.setHours(23, 59);

    const bookingdtime = await this.appointmentsRepository.find({
      relations: ['patient','doctor'],
      where: {doctor: {id: doctor_id},
              status: Status.Waiting,
              date_start: Between(startDate,finishDate)
            },
    });
    console.log(bookingdtime.map(app => {return app.date_start}))
    return bookingdtime.map(app => {return app.date_start})
  }

  async update(id:number,appointment:UpdateAppointmentDto): Promise<AppointmentEntity>{
    try {
        const _appointment = await this.findOne(id);
      if(_appointment){
        const appointmentEntity = new AppointmentEntity();
        appointmentEntity.id = _appointment.id;
        appointmentEntity.status = Status[appointment.status];
        return await this.appointmentsRepository.save(appointmentEntity);
      } else {
        throw new BadRequestException(`the appointment Id=${id} doesn't exist.`);
      }
    } catch (error) {
      throw new BadRequestException(`Произошла ошибка: ${error}`);
    }
  }

  async delete(id: number): Promise<boolean | Error>{
    try {
      const _appointment = await this.findOne(id)
      if(_appointment){
         await this.appointmentsRepository.delete({id})
         return true
      } else {
          throw new HttpException(
            {
                status: HttpStatus.FORBIDDEN,
                error: 'This appointment does not exist.',
            }, HttpStatus.FORBIDDEN
          )
      }
    } catch (error) {
       return new Error(error)
    }

  }
}
