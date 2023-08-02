import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './appointment.entity';
import { CreateAppointmentDto } from './dtos/create-appointment-dto';

@Injectable()
export class AppointmentsService {
constructor(
  @InjectRepository(Appointment)
    private appointmentsRepository: Repository<Appointment>,
) {}

//async create (appointment: CreateAppointmentDto): Promise<>

}
