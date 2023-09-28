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
    // Get array of data according checking dates in db
    const dataArr = [];
    for (
      let dateItem = new Date(createScheduleDto.date_start);
      dateItem <= new Date(createScheduleDto.date_end);
      dateItem.setDate(dateItem.getDate() + 1)
    ) {
      const _existShedule = await this.scheduleRepository.findOne({
        where: {
          doctor_id: createScheduleDto.doctor_id,
          date: dateItem,
        },
      });

      // If date exists
      if (_existShedule)
        throw new BadRequestException(
          'This date is already busy. Please remove it before creating new.'
        );
      // if date not exists
      dataArr.push({
        doctor_id: createScheduleDto.doctor_id,
        date: new Date(dateItem),
        cause: createScheduleDto.cause,
      });
    }
    return await this.scheduleRepository.save(dataArr);
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

  async deleteAllByDoctorId(doctorId: number) {
    try {
      const _schedule = await this.findAllByDoctorId(doctorId);

      if (_schedule) {
        await this.scheduleRepository.delete({ doctor_id: doctorId });
        return true;
      } else {
        throw new BadRequestException(
          `Schedule for the Doctor (ID ${doctorId}) does not exist.`
        );
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
        date: 'ASC',
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
        date: date,
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
