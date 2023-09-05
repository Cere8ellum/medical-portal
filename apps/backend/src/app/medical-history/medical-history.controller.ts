import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { MedicalHistoryService } from './medical-history.service';
import { CreateMedicalHistoryDto } from './dtos/create-medical-history.dto';
import { MedicalHistoryEntity } from './entities/medical-history.entity';
import { UpdateMedicalHistoryDto } from './dtos/update-medical-history.dto';

@ApiTags('Medical History')
@Controller('medical-history')
export class MedicalHistoryController {
  constructor(private readonly medicalHistoryService: MedicalHistoryService) {}

  @ApiOperation({
    summary: 'Получить данные medical-history по id',
  })
  @ApiParam({
    name:'id',
    type: String,
    description: 'medical history id'
  })
  @Get(':id')
  async findOne(
    @Param('id',ParseIntPipe) id: number
    ): Promise<MedicalHistoryEntity>{
    try {
      return await this.medicalHistoryService.findOne(id);
    } catch (error) {
      throw new Error(error.message);
    }
  }


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


  @ApiOperation({
    summary: 'Изменение данных, относящихся к приёму пациента (Appointment)',
  })
  @ApiParam({
    name:'id',
    type: String,
    description: 'medical history id'
  })
  @ApiBody({type: UpdateMedicalHistoryDto})
  @Patch('update/:id')
  async update(
    @Param('id',ParseIntPipe) id: number,
    @Body() updateMedHistoryDto: UpdateMedicalHistoryDto
  ): Promise<MedicalHistoryEntity | Error> {
    try {
      const result = await this.medicalHistoryService.update(
        id,
        updateMedHistoryDto
      );
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
