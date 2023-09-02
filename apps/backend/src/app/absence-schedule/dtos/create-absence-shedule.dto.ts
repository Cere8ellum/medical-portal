import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Timestamp } from 'typeorm';

export class CreateAbsenceScheduleDto {
  id: number;

  @ApiProperty({
    type: 'number',
    description: 'ID of a Doctor',
  })
  @IsNotEmpty()
  @IsNumber()
  doctor_id: number;

  @ApiProperty({
    type: Timestamp,
    description: 'Start Date of Absence',
  })
  @IsNotEmpty()
  date_start: Date;

  @ApiProperty({
    type: Timestamp,
    description: 'End Date of Absence',
  })
  @IsNotEmpty()
  date_end: Date;

  @ApiProperty({
    type: 'string',
    description: 'Cause of Absence',
    example: 'Vacation',
  })
  @IsNotEmpty()
  @IsString()
  cause: string;
}
