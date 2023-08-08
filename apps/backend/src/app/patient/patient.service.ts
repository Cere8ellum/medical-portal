import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PatientEntity } from './entities/patient.entity';
import { Repository } from 'typeorm';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UserService } from '../user/user.service';
import { UserRole } from '../user/enum/role.enum';
import { UserStatus } from '../user/enum/status.enum';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(PatientEntity)
    private readonly patientRepository: Repository<PatientEntity>,
    private userService: UserService
  ) {}

  async create(patient: CreatePatientDto) {
    const { birthday, address, ...patientData } = patient;
    const userData = {
      role: UserRole.USER,
      status: UserStatus.INACTIVE,
      ...patientData,
    };
    const _createdUserId = await this.userService.create(userData);
    const _patient = await this.patientRepository.save({
      user_id: _createdUserId,
      ...patientData,
    });

    return _patient;
  }
}
