import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { PatientEntity } from './entities/patient.entity';
import { PatientController } from './patient.controller';
import { PatientService } from './patient.service';

@Module({
  providers: [PatientService],
  controllers: [PatientController],
  imports: [
    TypeOrmModule.forFeature([PatientEntity]),
    forwardRef(() => UserModule),
  ],
  exports: [
    TypeOrmModule.forFeature([PatientEntity]),
    PatientService
  ]
})
export class PatientModule {}
