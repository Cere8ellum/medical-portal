import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { AbsenceScheduleService } from './absence-schedule.service';
import { CreateAbsenceScheduleDto } from './dtos/create-absence-shedule.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AbsenceScheduleEntity } from './entities/absence-schedule.entity';

@ApiTags('Absence Schedule')
@Controller('absence-schedule')
export class AbsenceScheduleController {
  constructor(private readonly absenceSheduleService: AbsenceScheduleService) {}

  @ApiOperation({ summary: 'Создание расписания отсутствия врача' })
  @Post()
  async create(
    @Body() absenceScheduleDto: CreateAbsenceScheduleDto
  ): Promise<AbsenceScheduleEntity[] | Error> {
    try {
      const result = await this.absenceSheduleService.create(
        absenceScheduleDto
      );
      return result;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @ApiOperation({
    summary: 'Получить расписание отстутствия врача по Doctor ID',
  })
  @Get('doctor')
  async getScheduleByDoctorId(
    @Query('doctorId') doctorId: number
  ): Promise<AbsenceScheduleEntity[] | Error> {
    return this.absenceSheduleService.findAllByDoctorId(doctorId);
  }

  /**
   *
   * @param scheduleId
   * @returns boolean | Error
   */
  @ApiOperation({
    summary: 'Удалить дату отсутствия из расписания врача по Schedule ID',
  })
  @Delete('/schedule')
  async removeScheduleById(
    @Query('scheduleId') scheduleId: number
  ): Promise<boolean | HttpException> {
    try {
      return await this.absenceSheduleService.deleteById(scheduleId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   *
   * @param scheduleId
   * @returns boolean | Error
   */
  @ApiOperation({
    summary: 'Удалить все даты отсутствия из расписания врача по Doctor ID',
  })
  @Delete('/doctor')
  async removeAllScheduleByDoctorId(
    @Query('doctorId') doctorId: number
  ): Promise<boolean | HttpException> {
    try {
      return await this.absenceSheduleService.deleteAllByDoctorId(doctorId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
