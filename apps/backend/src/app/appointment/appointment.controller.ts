import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, Query } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiCreatedResponse, ApiForbiddenResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from '../user/user.service';
import { AppointmentsModule } from './appointment.module';
import { AppointmentsService } from './appointment.service';
import { CreateAppointmentDto } from './dtos/create-appointment-dto';
import { UpdateAppointmentDto } from './dtos/update-appointment-dto';
import { AppointmentEntity } from './entities/appointment.entity';

@ApiTags('appointments')
@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) { }

  @Get('patient/:idPatient')
  @ApiOperation({ summary: 'Все записи к врачу для пациента с id' })
  async findAllByIdPatient(@Param('idPatient', ParseIntPipe) idPatient: number):Promise<AppointmentEntity[]>{
     return await this.appointmentsService.findAllByPatient(idPatient)
  }

  @Get('doctor/:idDoctor')
  @ApiOperation({ summary: 'Все слоты к doctorid забронированные status = waiting' })
  async findAllByIdDoctorBooked(@Param('idDoctor', ParseIntPipe) idDoctor: number):Promise<AppointmentEntity[]>{
     return await this.appointmentsService.findAllByDoctorStatusWaiting(idDoctor)
  }

  @Get(':id')
  @ApiOperation({ summary: 'Appointment c id' })
  async findOneAppointment(@Param("id",ParseIntPipe) id : number): Promise<AppointmentEntity>{
    return await this.appointmentsService.findOne(id)
  }

  @Get('sort/:idPatient')
  @ApiOperation({ summary: 'Отсортировать appointment за выбранный период у пациента с idPatient'})
  async sortAppointmentPeriod(
    @Param("idPatient",ParseIntPipe) idPatient : number,
    @Query('start') start: string,
    @Query('finish') finish : string
  ): Promise<AppointmentEntity[]>{
    return await this.appointmentsService.findAllByPatientForPeriod(idPatient,new Date(start),new Date(finish))
  }

  @Post('create')
  @ApiOperation({ summary: 'Бронирование записи к врачу' })
  @ApiCreatedResponse({ description: 'The appointment has been successfully created.', type: AppointmentEntity })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiBody({type:  CreateAppointmentDto})
  async create(@Body() appointmentDto: CreateAppointmentDto):Promise<string | Error>{
    try {
      const result = await this.appointmentsService.create(appointmentDto)
      return `${result.patient.firstname} ${result.patient.lastname}, you booked appointment on date ${result.date_start} to Dr. ${result.doctor.lastname}`
    } catch (error) {
      return new Error(`An error occurred while booking. Message: ${error}`)
    }
  }

  @Patch('update/:id')
  @ApiOperation({ summary: 'Изменение статуса записи к врачу' })
  @ApiResponse({ status: 201, description: 'The record has been successfully updated.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBody({type:  UpdateAppointmentDto})
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() appointmentDto: UpdateAppointmentDto) {
    try {
      return await this.appointmentsService.update(id,appointmentDto);
    } catch (error) {
      return new Error(`err: ${error}`);
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удаление appointmentId' })
  async delete(@Param('id', ParseIntPipe) id : number) {
    const _del = await this.appointmentsService.delete(id);
    if(_del === true){
      return 'Запись успешно отменена'
    } else { return 'Произошла ошибка,запись удалить не удалось'}
  }
}
