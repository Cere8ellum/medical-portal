import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateScheduleDto {
  id: number;

  @IsNotEmpty()
  @IsNumber()
  doctor_id: number;

  @IsNotEmpty()
  // @IsDate()
  date: Date;

  @IsNotEmpty()
  time_start: string;

  @IsNotEmpty()
  time_finish: string;

  @IsNumber()
  @IsNotEmpty()
  step: number;
}
