import { forwardRef, Module } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorEntity } from './entities/doctor.entity';
import { UserEntity } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([DoctorEntity]),
    forwardRef(() => UserModule),
],
  providers: [DoctorService],
  controllers: [DoctorController],
  exports: [DoctorService,
    TypeOrmModule.forFeature([DoctorEntity])
  ],
})
export class DoctorModule {}
