import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ScheduleSetupService } from './schedule-setup.service';
import { CreateScheduleDto } from './dtos/create-shedule.dto';
import { ScheduleEntity } from './entities/schedule.entity';

@ApiTags('schedule-setup')
@Controller('schedule-setup')
export class ScheduleSetupController {
  constructor(private readonly sheduleService: ScheduleSetupService) {}

  @Post('create')
  @ApiOperation({ summary: 'Создание расписания' })
  async create(
    @Body() scheduleDto: CreateScheduleDto
  ): Promise<ScheduleEntity | Error> {
    try {
      const result = await this.sheduleService.create(scheduleDto);
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @ApiOperation({ summary: 'Получить расписание врача по id' })
  @Get('/doctor/:doctorId')
  async getScheduleByDoctorId(
    @Param('doctorId', ParseIntPipe) doctorId: number
  ): Promise<ScheduleEntity[] | Error> {
    return this.sheduleService.findAllByDoctorId(doctorId);
  }
}
