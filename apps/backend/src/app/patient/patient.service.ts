import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PatientEntity } from './entities/patient.entity';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { CreatePatientDto } from './dto/create-patient.dto';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(PatientEntity)
    private readonly doctorRepository: Repository<PatientEntity>,
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async create(patient: CreatePatientDto) {
    return;
  }
}
