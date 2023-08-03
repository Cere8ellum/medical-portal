import { BadRequestException, Injectable } from '@nestjs/common';
import { DoctorEntity } from './entities/doctor.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UserEntity } from '../user/entities/user.entity';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(DoctorEntity)
    private readonly doctorRepository: Repository<DoctorEntity>,
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async create(doctor: CreateDoctorDto) {
    // Checking for the existence of an email
    const foundByEmail = await this.findByEmail(doctor.email);

    if (foundByEmail) {
      throw new BadRequestException(
        `Пользователь с email ${doctor.email} уже зарегистрирован`,
        {
          description: 'Email существует',
        }
      );
    }
  }

  async findAll(): Promise<DoctorEntity[]> {
    return this.doctorRepository.find({});
  }

  async findById(id: number): Promise<DoctorEntity> {
    return this.doctorRepository.findOne({ where: { id } });
  }

  async findByEmail(email: string): Promise<UserEntity> {
    const tlc = email.toLowerCase();
    return await this.userRepository.findOne({ where: { email: tlc } });
  }
}
