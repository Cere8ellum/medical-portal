import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateAbsenceScheduleDto {
  id: number;

  @IsNotEmpty()
  @IsNumber()
  doctor_id: number;

  @IsNotEmpty()
  date: Date;
}
