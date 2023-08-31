import { Body, Controller, Post } from '@nestjs/common';
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
      const result = await this.medicalHistoryService.create(
        absenceScheduleDto
      );
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
