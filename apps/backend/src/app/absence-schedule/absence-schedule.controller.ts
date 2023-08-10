import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { AbsenceScheduleService } from './absence-schedule.service';
import { CreateAbsenceScheduleDto } from './dtos/create-absence-shedule.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AbsenceScheduleEntity } from './entities/absence-schedule.entity';

@ApiTags('Absence Schedule')
@Controller('absence-schedule')
export class AbsenceScheduleController {
  constructor(private readonly absenceSheduleService: AbsenceScheduleService) {}

  @Post()
  @ApiOperation({ summary: 'Создание расписания отсутствия врача' })
  async create(
    @Body() absenceScheduleDto: CreateAbsenceScheduleDto
  ): Promise<AbsenceScheduleEntity | Error> {
    try {
      const result = await this.absenceSheduleService.create(
        absenceScheduleDto
      );
      return result;
    } catch (error) {
      throw new Error(error.message);
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
  ): Promise<boolean | Error> {
    return await this.absenceSheduleService.deleteById(scheduleId);
  }
}
