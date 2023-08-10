import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsNotEmpty, IsNumber, IsString, ValidateIf } from 'class-validator';
import { Gender } from '../enum/gender.enum';
import { Role } from '../enum/role.enum';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto  {

  @IsString()
  @ValidateIf((o) => o.firstname)
  firstname: string

  @IsString()
  @ValidateIf((o) => o.lastname)
  lastname: string

  @IsEnum(Gender)
  @ValidateIf((o) => o.gender)
  gender: Gender

  @IsString()
  @ValidateIf((o) => o.birthdate)
  birthdate: string

  @IsString()
  @ValidateIf((o) => o.email)
  email: string

  @IsString()
  @ValidateIf((o) => o.address)
  address: string

  @IsString()
  @ValidateIf((o) => o.mobile)
  mobile: string

  @IsString()
  @ValidateIf((o) => o.password)
  password: string

  @IsEnum(Role)
  @ValidateIf((o) => o.role)
  role: Role
}
