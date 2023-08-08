import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreatePatientDto {
  parent_id: number;

  @IsNotEmpty()
  birthday: Date;

  @IsNotEmpty()
  address: string;

  // For User
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  firstname: string;

  @IsNotEmpty()
  lastname: string;

  @IsNotEmpty()
  gender: string;
}
