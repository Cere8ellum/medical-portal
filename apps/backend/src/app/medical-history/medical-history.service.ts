import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MedicalHistoryEntity } from './entities/medical-history.entity';
import { CreateMedicalHistoryDto } from './dtos/create-medical-history.dto';
import { UpdateMedicalHistoryDto } from './dtos/update-medical-history.dto';

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

  async findOne(id: number) : Promise<MedicalHistoryEntity> {
    try {
      const _opinion = await this.medicalHistoryRepository.findOneBy({id})
      if( !_opinion) {
        throw new  Error('The medical history with this id doesn`t exist.')
      }
      return _opinion
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  async update(id:number,updateMedHistoryDto:UpdateMedicalHistoryDto):Promise<MedicalHistoryEntity> {
    try {
      const _opinion = await this.findOne(id);
      if(_opinion) {
        await this.medicalHistoryRepository.save({
          patient_complaint: updateMedHistoryDto.patient_complaint,
          treatment_plan: updateMedHistoryDto.treatment_plan,
          disease_conclusion: updateMedHistoryDto.disease_conclusion,
          id: id,
        });
        return await this.findOne(id);
      } else {
        throw new Error('The medical history with this id doesn`t exist.')
      }
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }
}
