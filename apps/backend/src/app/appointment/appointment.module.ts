import { forwardRef, Module } from '@nestjs/common';
import { AppointmentEntity } from './entities/appointment.entity';
import { AppointmentsController } from './appointment.controller';
import { AppointmentsService } from './appointment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicalHistoryModule } from '../medical-history/medical-history.module';
import { UserModule } from '../user/user.module';
import { MailerModule,} from '@nestjs-modules/mailer';
import { DoctorModule } from '../doctor/doctor.module';
import { AbsenceScheduleModule } from '../absence-schedule/absence-schedule.module';

@Module({
  imports: [TypeOrmModule.forFeature([AppointmentEntity]),
  forwardRef(() => MedicalHistoryModule),
  forwardRef(() => DoctorModule),
  forwardRef(()=> UserModule),
  forwardRef(()=> AbsenceScheduleModule),
  forwardRef(()=> MedicalHistoryModule),
  MailerModule],
  controllers: [AppointmentsController],
  providers: [AppointmentsService],
})
export class AppointmentsModule {}
