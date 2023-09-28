import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { DoctorModule } from '../doctor/doctor.module';
import { MailModule } from '../mail/mail.module';
import {JwtModule} from '@nestjs/jwt';

@Module({
  imports: [
    MailModule,
    TypeOrmModule.forFeature([UserEntity]),
    forwardRef(() => DoctorModule),
    JwtModule.register({
      secret: 'secret',
      global: true,
      signOptions: { expiresIn: '1w' }
    })
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService, TypeOrmModule.forFeature([UserEntity])],
})
export class UserModule {}
