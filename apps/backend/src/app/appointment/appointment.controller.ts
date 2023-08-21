import { BadRequestException, Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiCreatedResponse, ApiForbiddenResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from '../user/user.service';
import { AppointmentsModule } from './appointment.module';
import { AppointmentsService } from './appointment.service';
import { CreateAppointmentDto } from './dtos/create-appointment-dto';
import { UpdateAppointmentDto } from './dtos/update-appointment-dto';
import { AppointmentEntity } from './entities/appointment.entity';
import { getCookie } from '../../utils/cookie';
import { Response, Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '../user/auth.guard';


@ApiTags('appointments')
@Controller('appointments')
export class AppointmentsController {
  constructor(
    private readonly appointmentsService: AppointmentsService,
    //private jwtService: JwtService
    ) { }

  @Get('patient/:idPatient')
  @ApiOperation({ summary: 'Все записи к врачу для пациента с id' })
  async findAllByIdPatient(@Param('idPatient', ParseIntPipe) idPatient: number):Promise<AppointmentEntity[]>{
     return await this.appointmentsService.findAllByPatient(idPatient)
  }

  @Get('doctor/:idDoctor')
  @ApiOperation({ summary: 'Все слоты к doctorid забронированные status = waiting' })
  async findAllByIdDoctorBookedWaiting(
    @Param('idDoctor', ParseIntPipe) idDoctor: number,
    @Query('date')date: string):Promise<Date[]>{

     return await this.appointmentsService.findAllByDoctorStatusWaiting(idDoctor, new Date(date))
  }

  @Get('booked/doctor/:idDoctor')
  @ApiOperation({ summary: 'Все забронированные слоты к doctorid' })
  async findAllByIdDoctorBooked(
    @Param('idDoctor', ParseIntPipe) idDoctor: number,
    @Query('date')date: string):Promise<Date[]>{

     return await this.appointmentsService.findBookingDate(idDoctor, new Date(date))
  }

  /**
   *
   * @param idPatient -пациент
   * @param date - дата и время
   * @returns true - забронировано, false - not
   */
  @Get('booked/patient/:idPatient')
  @ApiOperation({ summary: 'Есть ли у пациента уже забронированный слот на это время' })
  async isBookedSlotOnDate(
    @Param('idPatient', ParseIntPipe) idPatient: number,
    @Query('date')date: string):Promise<boolean>{
     return await this.appointmentsService.findByPatientOnDate(idPatient, new Date(date))
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

  @UseGuards(AuthGuard)
  @Post('create')
  @ApiOperation({ summary: 'Бронирование записи к врачу' })
  @ApiCreatedResponse({ description: 'The appointment has been successfully created.', type: AppointmentEntity })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiBody({type:  CreateAppointmentDto})
  async create(
    @Body() appointmentDto: CreateAppointmentDto,
    @Req() request: Request
    ):Promise<string>{
    try {
      if(!appointmentDto.patient_id){
        appointmentDto.patient_id = `${request['user'].id}`
      }
      const result = await this.appointmentsService.create(appointmentDto);
      return `${result.patient.firstname} ${result.patient.lastname}, you booked appointment on date ${result.date_start} to Dr. ${result.doctor.user.lastname}`
    } catch (error) {
      throw new BadRequestException(`An error occurred while booking. Message: ${error}`)
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
      return new BadRequestException(`err: ${error}`);
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
