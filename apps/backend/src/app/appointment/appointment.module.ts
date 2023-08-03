import { forwardRef, Module } from '@nestjs/common';
import { AppointmentEntity } from './entities/appointment.entity';
import { AppointmentsController } from './appointment.controller';
import { AppointmentsService } from './appointment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicalHistoryModule } from '../medical-history/medical-history.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([AppointmentEntity]),
  forwardRef(() => MedicalHistoryModule),
  forwardRef(()=> UserModule)],
  controllers: [AppointmentsController],
  providers: [AppointmentsService],
})
export class AppointmentsModule {}
