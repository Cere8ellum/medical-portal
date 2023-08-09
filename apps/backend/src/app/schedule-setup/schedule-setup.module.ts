import { Module } from '@nestjs/common';
import { ScheduleSetupService } from './schedule-setup.service';
import { ScheduleSetupController } from './schedule-setup.controller';
import { ScheduleEntity } from './entities/schedule.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ScheduleEntity])],
  providers: [ScheduleSetupService],
  controllers: [ScheduleSetupController],
})
export class ScheduleSetupModule {}
