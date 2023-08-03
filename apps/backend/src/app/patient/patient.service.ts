import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PatientEntity } from './entities/patient.entity';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(PatientEntity,)
    private readonly patientRepository: Repository<PatientEntity>,
    private readonly userService: UserService
  ) {}

  async create(patient: CreatePatientDto) {
    return;
  }
}
