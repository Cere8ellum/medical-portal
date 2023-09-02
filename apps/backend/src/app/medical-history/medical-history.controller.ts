import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { MedicalHistoryService } from './medical-history.service';
import { CreateMedicalHistoryDto } from './dtos/create-medical-history.dto';
import { MedicalHistoryEntity } from './entities/medical-history.entity';

@ApiTags('Medical History')
@Controller('medical-history')
export class MedicalHistoryController {
  constructor(private readonly medicalHistoryService: MedicalHistoryService) {}

  @ApiOperation({
    summary: 'Заполнение данных, относящихся к приёму пациента (Appointment)',
  })
  @Post()
  async create(
    @Body() absenceScheduleDto: CreateMedicalHistoryDto
  ): Promise<MedicalHistoryEntity | Error> {
    try {
      return await this.medicalHistoryService.create(absenceScheduleDto);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @ApiOperation({
    summary: 'Получить все медицинские истории',
  })
  @Get()
  async getAll(): Promise<MedicalHistoryEntity[] | Error> {
    try {
      return await this.medicalHistoryService.findAll();
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
