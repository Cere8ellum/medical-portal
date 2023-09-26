import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserService } from '../user/user.service';
import { AppointmentsService } from './appointment.service';
import { CreateAppointmentDto } from './dtos/create-appointment-dto';
import { UpdateAppointmentDto } from './dtos/update-appointment-dto';
import { AppointmentEntity } from './entities/appointment.entity';
import { Response, Request } from 'express';
import { AuthGuard } from '../user/auth.guard';
import { DoctorService } from '../doctor/doctor.service';
import moment from 'moment';
import dayjs from 'dayjs';
import { Status } from './enum/status.enum';
import { CreateMedicalHistoryDto } from '../medical-history/dtos/create-medical-history.dto';
import { AbsenceScheduleService } from '../absence-schedule/absence-schedule.service';


@ApiTags('appointments')
@Controller('appointments')
export class AppointmentsController {
  constructor(
    private readonly appointmentsService: AppointmentsService,
    private readonly userService: UserService,
    private readonly doctorService: DoctorService,
    private readonly scheduleService: AbsenceScheduleService
  ) {}

  /**
   *
   * @param idPatient
   * @returns
   */
  @Get('patient/:idPatient')
  @ApiOperation({ summary: 'Все записи к врачам для пациента id' })
  @ApiParam({
    name: 'idPatient',
    required: true,
    type: String,
    description: 'id пациента',
  })
  @ApiResponse({ status: 200, description: 'Список записей пациента' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
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
            date: moment(appointment.date_start).format('YYYY-MM-DD'),
            time: moment(appointment.date_start).format('HH:mm'),
            doctor: `${appointment.doctor.user.firstname} ${appointment.doctor.user.lastname}`,
            speciality: appointment.doctor.speciality,
            patient: `${appointment.patient.firstname} ${appointment.patient.lastname}`,
            status: appointment.status,
            id: appointment.id,
            opinion: appointment.opinion,
            doctorId: appointment.doctor.id
          });
        });
        res.status(HttpStatus.OK).json(_appList);
      } catch (error) {
        throw new BadRequestException(`Message: ${error}`)
  }}

  @Get('doctor/:idDoctor')
  @ApiOperation({
    summary: 'Все слоты к doctorid забронированные в заданный день',
  })
  @ApiParam({
    name: 'idDoctor',
    required: true,
    type: String,
    description: 'id врача',
  })
  @ApiQuery({
    name: 'date',
    required: true,
    type: String,
    description: 'дата в формату YYYY-MM-DD для поиска',
  })
  @ApiResponse({ status: 200, description: 'Список записей у врача' })
  @ApiResponse({ status: 400, description: 'Error' })
  async findAllByIdDoctorBookedWaiting(
    @Param('idDoctor', ParseIntPipe) idDoctor: number,
    @Query('date') date: string,
    @Res() res: Response
  ) {
    try {
      const _appointments =
        await this.appointmentsService.findAllByDoctorStatusWaiting(
          idDoctor,
          new Date(date)
        );
      const _appList = [];
      _appointments.forEach((appointment) => {
        _appList.push({
          date: moment(appointment.date_start).format('YYYY-MM-DD'),
          time: moment(appointment.date_start).format('HH:mm'),
          patient_name: `${appointment.patient.firstname} ${appointment.patient.lastname}`,
          patient_id: appointment.patient.id,
          id: appointment.id,
        });
      });
      res.status(HttpStatus.OK).json(_appList);
    } catch (error) {
      throw new BadRequestException(`${error}`);
    }
  }

  @Get('booked/doctor/:idDoctor')
  @ApiOperation({ summary: 'Все забронированные слоты к doctorid' })
  @ApiParam({
    name: 'idDoctor',
    required: true,
    type: String,
    description: 'id врача',
  })
  @ApiQuery({
    name: 'date',
    required: true,
    type: String,
    description: 'дата в формату YYYY-MM-DD для поиска',
  })
  @ApiResponse({ status: 200, description: 'Список времен в формате HH:mm' })
  @ApiResponse({ status: 400, description: 'Forbidden.' })
  async findAllByIdDoctorBooked(
    @Param('idDoctor', ParseIntPipe) idDoctor: number,
    @Query('date') date: string
  ): Promise<string[]> {
    try {
      return await this.appointmentsService.findBookingDate(
        idDoctor,
        new Date(date)
      );
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
  @ApiOperation({
    summary: 'Есть ли у пациента уже забронированный слот на это время',
  })
  @ApiParam({
    name: 'idPatient',
    required: true,
    type: String,
    description: 'id Patient',
  })
  @ApiQuery({
    name: 'date',
    required: true,
    type: String,
    description: 'дата в формату YYYY-MM-DD HH:mm для поиска',
  })
  async isBookedSlotOnDate(
    @Param('idPatient', ParseIntPipe) idPatient: number,
    @Query('date') date: string
  ): Promise<boolean> {
    try {
      return await this.appointmentsService.PatientisBookedOnDate(
        idPatient,
        new Date(date)
      );
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
  @ApiOperation({ summary: 'поиск записи по id' })
  @ApiParam({
    name: 'id',
    required: false,
    type: Number,
    description: 'appointment id',
  })
  @ApiResponse({
    status: 200,
    description: 'Возвращаются данные записи',
  })
  @ApiResponse({
    status: 404,
    description: 'Записи не существует'
  })
  async findOneAppointment(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response
  ) {
    try {
      const _appointment = await this.appointmentsService.findOne(id);
      if (!_appointment) {
        res
          .status(HttpStatus.NOT_FOUND)
          .send('Записи не существует');
      }
      res.status(HttpStatus.OK).json({
        date: moment(_appointment.date_start).format('YYYY-MM-DD HH:mm'),
        doctor: `${_appointment.doctor.user.firstname} ${_appointment.doctor.user.lastname}`,
        speciality: _appointment.doctor.speciality,
        patient: `${_appointment.patient.firstname} ${_appointment.patient.lastname}`,
        bday: _appointment.patient.birthdate,
        status: _appointment.status,
        category: _appointment.doctor.category,
        id: _appointment.id,
        opinion: _appointment.opinion,
        doctorId: _appointment.doctor.id,
      });
    } catch (error) {
      throw new BadRequestException(`err: ${error}`);
    }
  }

  @Get('sort/:idPatient')
  @ApiOperation({
    summary:
      'Отсортировать appointment за выбранный период у пациента с idPatient',
  })
  @ApiQuery({
    name: 'start',
    required: true,
    type: String,
    description: 'дата начала поиска',
  })
  @ApiQuery({
    name: 'finish',
    required: true,
    type: String,
    description: 'дата конца поиска',
    example: '2023-12-08',
  })
  @ApiParam({
    name: 'idPatient',
    required: true,
    type: String,
    description: 'id пациента',
  })
  @ApiResponse({ status: 200, description: 'Список записей' })
  @ApiResponse({ status: 400, description: 'Error' })
  async sortAppointmentPeriod(
    @Param('idPatient', ParseIntPipe) idPatient: number,
    @Query('start') start: string,
    @Query('finish') finish: string,
    @Res() res: Response
  ) {
    try {
      const patient = await this.userService.findOne(idPatient);
      if (!patient) {
        throw new BadRequestException('The patient doesn`t exist');
      }
      const _list = await this.appointmentsService.findAllByPatientForPeriod(
        idPatient,
        new Date(start),
        new Date(finish)
      );
      const _appList = [];
      _list.forEach((appointment) => {
        _appList.push({
          date: moment(appointment.date_start).format('YYYY-MM-DD HH:mm'),
          doctor: `${appointment.doctor.user.firstname} ${appointment.doctor.user.lastname}`,
          speciality: appointment.doctor.speciality,
          patient: `${appointment.patient.firstname} ${appointment.patient.lastname}`,
          status: appointment.status,
          category: appointment.doctor.category,
          id: appointment.id,
          opinion: appointment.opinion,
          doctorId: appointment.doctor.id,
        });
      });
      res.status(HttpStatus.OK).json(_appList);
    } catch (error) {
      throw new BadRequestException(`err: ${error}`);
    }
  }

  @UseGuards(AuthGuard)
  @Post('create')
  @ApiOperation({ summary: 'Создание.Бронирование записи к врачу' })
  @ApiCreatedResponse({
    description: 'Запись успешно создалась',
    type: AppointmentEntity,
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiBody({ type: CreateAppointmentDto })
  async create(
    @Body() appointmentDto: CreateAppointmentDto,
    @Req() request: Request,
    @Res() res: Response
  ) {
    try {
      if (!appointmentDto.patient_id) {
        appointmentDto.patient_id = `${request['user'].id}`;
      }
      const result = await this.appointmentsService.create(appointmentDto);
      res
        .status(HttpStatus.OK)
        .send(
          `${result.patient.firstname} ${result.patient.lastname}, вы забронировали визит на ${dayjs(result.date_start).format('DD.MM.YYYY')} в ${dayjs(result.date_start).format('HH:mm')} к доктору ${result.doctor.user.firstname} ${result.doctor.user.lastname}`
        );
    } catch (error) {
      throw new BadRequestException(
        `Произошла ошибка на стороне сервера.Запись не создалась: ${error}`
      );
    }
  }

  /**
   *
   * @param id
   * @param status
   * @param res
   */
  @Patch('update/:id')
  @ApiOperation({ summary: 'Изменение записи.Смена статуса' })
  @ApiResponse({
    status: 200,
    description: 'Изменение произошло успешно',
  })
  @ApiResponse({ status: 404, description: 'Записи не сущесвует' })
  @ApiParam({
    name: 'id',
    required: false,
    type: String,
    description: 'appointment id',
  })
  @ApiQuery({
    enum: ['Waiting', 'Cancelled', 'Completed', 'Started'],
    description: 'Status визита',
    name: 'status',
    type: String,
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Query('status') status: Status,
    @Res() res: Response
  ) {
    try {
      const _app = await this.appointmentsService.findOne(id);
      if (!_app) {
        res
          .status(HttpStatus.NOT_FOUND)
          .send(`Записи не сущесвует`);
      }
      if ((status = Status.Cancelled)) {
        await this.appointmentsService.delete(_app);
        res.status(HttpStatus.OK).send('Удаление записи произошло успешно');
      } else {
        await this.appointmentsService.updateStatus(id, status);
        res.status(HttpStatus.OK).send('Изменение произошло успешно');
      }
    } catch (error) {
      throw new BadRequestException(`err: ${error}`);
    }
  }


  /**
   *
   * @param id
   * @param createMedHistory
   * @param res
   */
  @Patch('/:id/addOpinion')
  @ApiOperation({
    summary: 'Изменение записи. Добавление заключения' })
  @ApiResponse({
    status: 200,
    description: 'Запись успешно изменена',
  })
  @ApiResponse({ status: 400, description: 'Forbidden.' })
  @ApiResponse({
    status: 404,
    description: 'Записи не сущесвует' })
  @ApiParam({
    name: 'id',
    required: false,
    type: String,
    description: 'appointment id',
  })
  @ApiBody({
    type: CreateMedicalHistoryDto,
  })
  async addOpinion(
    @Param('id', ParseIntPipe) id: number,
    @Body() createMedHistory: CreateMedicalHistoryDto,
    @Res() res: Response
  ) {
    try {
      const _app = await this.appointmentsService.findOne(id);
      if (!_app) {
        res
          .status(HttpStatus.NOT_FOUND)
          .send('Записи не сущесвует');
      }
      const appointment =
        await this.appointmentsService.updateAddMedicalHistory(
          id,
          createMedHistory
        );
      res.status(HttpStatus.OK).json({
        date: moment(appointment.date_start).format('YYYY-MM-DD'),
        time: moment(appointment.date_start).format('HH:mm'),
        doctor: `${appointment.doctor.user.firstname} ${appointment.doctor.user.lastname}`,
        speciality: appointment.doctor.speciality,
        patient: `${appointment.patient.firstname} ${appointment.patient.lastname}`,
        bday: appointment.patient.birthdate,
        status: appointment.status,
        category: appointment.doctor.category,
        id: appointment.id,
        opinion: appointment.opinion,
        doctorId: appointment.doctor.id,
      });
    } catch (error) {
      throw new BadRequestException(`err: ${error}`);
    }
  }

/**
 *
 * @param id
 * @param newApp
 * @param res
 */
  @Patch('update/:id/newvisit')
  @ApiOperation({ summary: 'Изменение записи. Новый визит к врачу' })
  @ApiResponse({
    status: 200,
    description: 'Запись успешно заменена',
    type: AppointmentEntity
  })
  @ApiResponse({
    status: 400,
    description: 'Запрос содержит некорректные данные или неправильный формат данных' })
  @ApiResponse({
    status: 404,
    description: 'Записи или доктора не сущесвует' })
  @ApiResponse({
    status: 500,
    description: 'Произошла ошибка на стороне сервера' })
  @ApiParam({
    name: 'id',
    required: false,
    type: String,
    description: 'appointment id',
  })
  @ApiBody({
    type: UpdateAppointmentDto,
  })
  async updateAppNewVisit(
    @Param('id', ParseIntPipe) id: number,
    @Body() newApp: UpdateAppointmentDto,
    @Res() res: Response
  ) {
    try {
      const _appOld = await this.appointmentsService.findOne(id);
      if (!_appOld) {
        res
          .status(HttpStatus.NOT_FOUND)
          .send(`Записи с id=${id} не сущесвует`);
      }
      const _doctor = await this.doctorService.findById(
        Number(newApp.doctor_id)
      );
      if (!_doctor) {
        res
          .status(HttpStatus.NOT_FOUND)
          .send(`Доктора с id=${newApp.doctor_id} не существует`);
      }
      if (newApp.status !== undefined && newApp.date_start !== undefined) {
        const _new = await this.appointmentsService.updateAppointmnent(
          _appOld,
          newApp,
          _doctor
        );
        res.status(HttpStatus.OK).json(_new);
      } else {
        res
          .status(HttpStatus.BAD_REQUEST)
          .send(
            'Запрос содержит некорректные данные или неправильный формат данных'
          );
      }
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send(`Произошла ошибка на стороне сервера: ${error}`);
    }
  }

  /**
   *
   * @param id
   * @returns
   */
  @Delete(':id')
  @ApiOperation({ summary: 'Удаление записи по Id' })
  @ApiParam({
    name: 'id',
    required: false,
    type: String,
    description: 'appointment id',
  })
  @ApiResponse({ status: 200, description: 'Запись успешно отменена' })
  @ApiResponse({
    status: 403,
    description: 'Произошла ошибка,удаление не возможно',
  })
  @ApiResponse({
    status: 404,
    description: 'Записи с таким id не существует',
  })
  async delete(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    try {
      const _app = await this.appointmentsService.findOne(id);
      if (!_app) {
        res
          .status(HttpStatus.NOT_FOUND)
          .send('Записи с таким id не существует');
      }
      const _del = await this.appointmentsService.delete(_app);
      if (_del === true) {
        const countAppAtDate =
          await this.appointmentsService.countAppointmentByDoctorAtDate(
            _app.doctor.id,
            _app.date_start
          );

        if (countAppAtDate === 23) {
          const _schedule = await this.scheduleService.findByDoctorIdAtDate(
            _app.doctor.id,
            new Date(_app.date_start)
          );
          await this.scheduleService.deleteById(_schedule.id);
        }
        res.status(HttpStatus.OK).send('Запись успешно отменена');
      } else {
        res
          .status(HttpStatus.FORBIDDEN)
          .send('Произошла ошибка,удаление не возможно');
      }
    } catch (error) {
      throw new BadRequestException(`err: ${error}`);
    }
  }
}


