import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppointmentEntity } from './entities/appointment.entity';
import { CreateAppointmentDto } from './dtos/create-appointment-dto';
import { UserService } from '../user/user.service';
import { Status } from './status/status.enum';

@Injectable()
export class AppointmentsService {
constructor(
  @InjectRepository(AppointmentEntity)
    private appointmentsRepository: Repository<AppointmentEntity>,
    private userService: UserService
) {}

async create (appointment: CreateAppointmentDto): Promise<AppointmentEntity> {
  const appointmentEntity = new AppointmentEntity();
  const _doctor = await this.userService.findOne(Number(appointment.doctor_id));
  //appointmentEntity.doctor = _doctor;
  const _patient = await this.userService.findOne(Number(appointment.patient_id));
  //appointmentEntity.patient = _patient;
  appointmentEntity.status = Status.Waiting;
  appointmentEntity.date_start = appointment.date_start

  return await this.appointmentsRepository.save(appointmentEntity)
}

async findOne(id:number) {}

}
