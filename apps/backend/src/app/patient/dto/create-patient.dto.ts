import { IsNotEmpty } from 'class-validator';

export class CreatePatientDto {
  parent_id: number;

  @IsNotEmpty()
  birthday: Date;

  @IsNotEmpty()
  address: string
}
