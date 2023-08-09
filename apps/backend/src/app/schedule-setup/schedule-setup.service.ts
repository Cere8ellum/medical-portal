import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ScheduleEntity } from './entities/schedule.entity';
import { Repository } from 'typeorm';
import { CreateScheduleDto } from './dtos/create-shedule.dto';

@Injectable()
export class ScheduleSetupService {
  constructor(
    @InjectRepository(ScheduleEntity)
    private scheduleRepository: Repository<ScheduleEntity>
  ) {}

  async create(createScheduleDto: CreateScheduleDto) {
    const _existShedule = await this.scheduleRepository.findOne({
      where: {
        doctor_id: createScheduleDto.doctor_id,
        date: createScheduleDto.date,
        time_start: createScheduleDto.time_start,
        time_finish: createScheduleDto.time_finish,
      },
    });
    if (_existShedule) throw new BadRequestException('This time is busy');

    const schedule = await this.scheduleRepository.save({
      doctor_id: createScheduleDto.doctor_id,
      date: createScheduleDto.date,
      time_start: createScheduleDto.time_start,
      time_finish: createScheduleDto.time_finish,
      step: createScheduleDto.step,
    });
    return schedule;
  }

  async findAllByDoctorId(doctorId: number): Promise<ScheduleEntity[]> {
    return await this.scheduleRepository.find({
      where: {
        doctor_id: doctorId,
      },
      order: {
        date: 'ASC',
      },
    });
  }
}
