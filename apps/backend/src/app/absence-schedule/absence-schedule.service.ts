import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
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
        date: createScheduleDto.date,
      },
    });
    if (_existShedule)
      return new BadRequestException('This date is already busy');

    const schedule = await this.scheduleRepository.save({
      doctor_id: createScheduleDto.doctor_id,
      date: createScheduleDto.date,
    });
    return schedule;
  }

  async deleteById(sheduleId: number): Promise<boolean | Error> {
    try {
      const _schedule = await this.findById(sheduleId);

      if (_schedule) {
        await this.scheduleRepository.delete({ id: sheduleId });
        return true;
      } else {
        console.log(_schedule);
        return new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: 'This schedule does not exist.',
          },
          HttpStatus.NOT_FOUND
        );
      }
    } catch (error) {
      return new Error(error);
    }
  }

  async findAllByDoctorId(doctorId: number): Promise<AbsenceScheduleEntity[]> {
    return await this.scheduleRepository.find({
      where: {
        doctor_id: doctorId,
      },
      order: {
        date: 'ASC',
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
