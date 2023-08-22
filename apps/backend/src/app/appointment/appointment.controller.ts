import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Patch, Post, Put, Query, Req, Res, UseGuards } from '@nestjs/common';
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
import { DoctorService } from '../doctor/doctor.service';


@ApiTags('appointments')
@Controller('appointments')
export class AppointmentsController {
  constructor(
    private readonly appointmentsService: AppointmentsService,
    private readonly userService: UserService,
    private readonly doctorService: DoctorService
    ) { }

  /**
   *
   * @param idPatient
   * @returns
   */
  @Get('patient/:idPatient')
  @ApiOperation({ summary: 'Все записи к врачам для пациента id' })
  async findAllByIdPatient(
    @Param('idPatient', ParseIntPipe) idPatient: number,
    @Res() res: Response
    ){
      try {
        const patient = await this.userService.findOne(idPatient);
        if(!patient){
          throw new BadRequestException('The patient doesn`t exist');
        }
        const _list = await this.appointmentsService.findAllByPatient(idPatient);
        let _appList = [];
        _list.forEach(appointment => {
          _appList.push({
            date: appointment.date_start,
            doctor: `${appointment.doctor.user.firstname} ${appointment.doctor.user.lastname}`,
            speciality: appointment.doctor.speciality,
            patient: `${appointment.patient.firstname} ${appointment.patient.lastname}`,
            status: appointment.status,
            id: appointment.id
          });
        });
        res.status(HttpStatus.OK).json(_appList);
      } catch (error) {
        throw new BadRequestException(`Message: ${error}`)
      }
  }

  @Get('doctor/:idDoctor')
  @ApiOperation({ summary: 'Все слоты к doctorid забронированные status = waiting' })
  async findAllByIdDoctorBookedWaiting(
    @Param('idDoctor', ParseIntPipe) idDoctor: number,
    @Query('date')date: string):Promise<Date[]>{
      try {
        return await this.appointmentsService.findAllByDoctorStatusWaiting(idDoctor, new Date(date))
      } catch (error) {
        throw new BadRequestException(`err: ${error}`);
      }
  }

  @Get('booked/doctor/:idDoctor')
  @ApiOperation({ summary: 'Все забронированные слоты к doctorid' })
  async findAllByIdDoctorBooked(
    @Param('idDoctor', ParseIntPipe) idDoctor: number,
    @Query('date')date: string):Promise<Date[]>{
      try {
        return await this.appointmentsService.findBookingDate(idDoctor, new Date(date))
      } catch (error) {
        throw new BadRequestException(`err: ${error}`);
      }
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
      try {
        return await this.appointmentsService.findByPatientOnDate(idPatient, new Date(date))
      } catch (error) {
        throw new BadRequestException(`err: ${error}`);
      }

  }

  /**
   *
   * @param id
   * @param res
   */
  @Get(':id')
  @ApiOperation({ summary: 'Appointment data' })
  async findOneAppointment(
    @Param("id",ParseIntPipe) id : number,
    @Res() res: Response
    ){
      try {
        const _appointment = await this.appointmentsService.findOne(id);
        if(!_appointment) {
          res.status(HttpStatus.FORBIDDEN)
        }
        res.status(HttpStatus.OK).json({
          date: _appointment.date_start,
          doctor: `${_appointment.doctor.user.firstname} ${_appointment.doctor.user.lastname}`,
          speciality: _appointment.doctor.speciality,
          patient: `${_appointment.patient.firstname} ${_appointment.patient.lastname}`,
          status: _appointment.status,
          id: _appointment.id
        });
      } catch (error) {
        throw new BadRequestException(`err: ${error}`);
      }
  }

  @Get('sort/:idPatient')
  @ApiOperation({ summary: 'Отсортировать appointment за выбранный период у пациента с idPatient'})
  async sortAppointmentPeriod(
    @Param("idPatient",ParseIntPipe) idPatient : number,
    @Query('start') start: string,
    @Query('finish') finish : string,
    @Res() res: Response
  ){
    try {
      const patient = await this.userService.findOne(idPatient);
        if(!patient){
          throw new BadRequestException('The patient doesn`t exist');
        }
        const _list = await this.appointmentsService.findAllByPatientForPeriod(idPatient,new Date(start),new Date(finish));
        let _appList = [];
        _list.forEach(appointment => {
          _appList.push({
            date: appointment.date_start,
            doctor: `${appointment.doctor.user.firstname} ${appointment.doctor.user.lastname}`,
            speciality: appointment.doctor.speciality,
            patient: `${appointment.patient.firstname} ${appointment.patient.lastname}`,
            status: appointment.status,
            id: appointment.id
          });
        });
        res.status(HttpStatus.OK).json(_appList);
    } catch (error) {
      throw new BadRequestException(`err: ${error}`);
    }

  }

  @UseGuards(AuthGuard)
  @Post('create')
  @ApiOperation({ summary: 'Бронирование записи к врачу' })
  @ApiCreatedResponse({ description: 'The appointment has been successfully created.', type: AppointmentEntity })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiBody({type:  CreateAppointmentDto})
  async create(
    @Body() appointmentDto: CreateAppointmentDto,
    @Req() request: Request,
    @Res() res: Response
    ){
    try {
      if(!appointmentDto.patient_id){
        appointmentDto.patient_id = `${request['user'].id}`
      }
      const result = await this.appointmentsService.create(appointmentDto);
      res.status(HttpStatus.OK).send(`${result.patient.firstname} ${result.patient.lastname}, you booked appointment on date ${result.date_start} to Dr. ${result.doctor.user.lastname}`);
    } catch (error) {
      throw new BadRequestException(`An error occurred while booking. Error: ${error}`)
    }
  }

  @Patch('update/:id')
  @ApiOperation({ summary: 'Изменение статуса записи к врачу' })
  @ApiResponse({ status: 201, description: 'The record has been successfully updated.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBody({type:  UpdateAppointmentDto})
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() appointmentDto: UpdateAppointmentDto,
    @Res() res: Response
    ) {
    try {
      await this.appointmentsService.update(id,appointmentDto);
      res.status(HttpStatus.OK).send('Изменение статуса произошло успешно');
    } catch (error) {
      throw new BadRequestException(`err: ${error}`);
    }
  }

  /**
   *
   * @param id
   * @returns
   */
  @Delete(':id')
  @ApiOperation({ summary: 'Удаление appointmentId' })
  async delete(
    @Param('id', ParseIntPipe) id : number,
    @Res() res: Response
    ) {
      try {
        const _del = await this.appointmentsService.delete(id);
        if(_del === true){
          res.status(HttpStatus.OK).send('Запись успешно отменена');
        } else { res.status(HttpStatus.FORBIDDEN).send('Произошла ошибка,удаление не возможно')}
      } catch (error) {
        throw new BadRequestException(`err: ${error}`);
      }
  }

}
