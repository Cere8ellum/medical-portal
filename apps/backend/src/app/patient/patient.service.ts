import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PatientEntity } from './entities/patient.entity';
import { Repository } from 'typeorm';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(PatientEntity,)
    private readonly patientRepository: Repository<PatientEntity>,
    private userService: UserService
  ) {}

  async create(patient: CreatePatientDto) {
    return;
  }
}
