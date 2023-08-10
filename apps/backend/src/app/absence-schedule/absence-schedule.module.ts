import { Module } from '@nestjs/common';
import { AbsenceScheduleService } from './absence-schedule.service';
import { AbsenceScheduleController } from './absence-schedule.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AbsenceScheduleEntity } from './entities/absence-schedule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AbsenceScheduleEntity])],
  providers: [AbsenceScheduleService],
  controllers: [AbsenceScheduleController],
})
export class AbsenceScheduleModule {}
