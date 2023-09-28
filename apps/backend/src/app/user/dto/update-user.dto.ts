import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateIf,
} from 'class-validator';
import { Gender } from '../enum/gender.enum';
import { Role } from '../enum/role.enum';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto {
  @IsString()
  @ValidateIf((o) => o.firstname)
  @ApiProperty({
    type: 'string',
    description: 'firstname',
  })
  firstname: string;

  @IsString()
  @ValidateIf((o) => o.lastname)
  @ApiProperty({
    type: 'string',
    description: 'lastname',
  })
  lastname: string;

  @IsString()
  @ValidateIf((o) => o.gender)
  @ApiProperty({
    enum: ['Мужчина','Женщина'],
    type:Role,
    description: 'gender',
  })
  gender: string;

  @IsString()
  @ValidateIf((o) => o.birthdate)
  @ApiProperty({
    type: 'string',
    description: 'birthdate',
  })
  birthdate: string;

  @IsString()
  @ValidateIf((o) => o.email)
  @ApiProperty({
    type: String,
    description: 'email',
  })
  email: string;

  @IsString()
  @ValidateIf((o) => o.address)
  @ApiProperty({
    type: String,
    description: 'address',
  })
  address: string;

  @IsString()
  @ValidateIf((o) => o.mobile)
  @ApiProperty({
    type: String,
    description: 'mobile',
  })
  mobile: string;

  @IsString()
  @ValidateIf((o) => o.password)
  @ApiProperty({
    type: String,
    description: 'password',
  })
  password: string;

  @IsEnum(Role)
  @ValidateIf((o) => o.role)
  @ApiProperty({
    enum: ['admin','doctor','patient'],
    type:Role,
    description: 'role',
  })
  role: Role;
}
