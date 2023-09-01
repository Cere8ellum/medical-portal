import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbsenceScheduleEntity } from './entities/absence-schedule.entity';
import { Repository } from 'typeorm';
import { CreateAbsenceScheduleDto } from './dtos/create-absence-shedule.dto';

@Injectable()
export class AbsenceScheduleService {
  constructor(
    @InjectRepository(AbsenceScheduleEntity)
    private scheduleRepository: Repository<AbsenceScheduleEntity>
  ) {}

  async create(createScheduleDto: CreateAbsenceScheduleDto) {
    const _existShedule = await this.scheduleRepository.findOne({
      where: {
        doctor_id: createScheduleDto.doctor_id,
        date_start: createScheduleDto.date_start,
      },
    });
    if (_existShedule)
      throw new BadRequestException('This date is already busy');

    const schedule = await this.scheduleRepository.save({
      doctor_id: createScheduleDto.doctor_id,
      date_start: createScheduleDto.date_start,
      date_end: createScheduleDto.date_end,
      cause: createScheduleDto.cause,
    });
    return schedule;
  }

  async deleteById(sheduleId: number) {
    try {
      const _schedule = await this.findById(sheduleId);

      if (_schedule) {
        await this.scheduleRepository.delete({ id: sheduleId });
        return true;
      } else {
        throw new BadRequestException('This schedule does not exist.');
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAllByDoctorId(doctorId: number): Promise<AbsenceScheduleEntity[]> {
    return await this.scheduleRepository.find({
      where: {
        doctor_id: doctorId,
      },
      order: {
        date_start: 'ASC',
      },
    });
  }

  async findByDoctorIdAtDate(
    doctorId: number,
    date: Date
  ): Promise<AbsenceScheduleEntity> {
    return await this.scheduleRepository.findOne({
      where: {
        doctor_id: doctorId,
        date_start: date,
      },
    });
  }

  async findById(scheduleId: number): Promise<AbsenceScheduleEntity> {
    return await this.scheduleRepository.findOne({
      where: {
        id: scheduleId,
      },
    });
  }
}
