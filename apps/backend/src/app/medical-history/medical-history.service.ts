import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MedicalHistoryEntity } from './entities/medical-history.entity';
import { CreateMedicalHistoryDto } from './dtos/create-medical-history.dto';

@Injectable()
export class MedicalHistoryService {
  constructor(
    @InjectRepository(MedicalHistoryEntity)
    private medicalHistoryRepository: Repository<MedicalHistoryEntity>
  ) {}

  async create(createScheduleDto: CreateMedicalHistoryDto) {
    return await this.medicalHistoryRepository.save({
      patient_complaint: createScheduleDto.patient_complaint,
      treatment_plan: createScheduleDto.treatment_plan,
      disease_conclusion: createScheduleDto.disease_conclusion,
      time_start: createScheduleDto.time_start,
    });
  }
}
