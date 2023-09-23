import {
  IsNotEmpty,
  IsString,
  ValidateIf,
  IsEnum,
  IsDate,
  IsNumber,
} from 'class-validator';
import { Status } from '../enum/status.enum';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAppointmentDto {
  @IsEnum(Status)
  @IsNotEmpty()
  @ApiProperty({
    enum: ['Waiting', 'Cancelled', 'Completed', 'Started'],
    description: 'Status визита',
    default: 'waiting',
  })
  status: Status;

  @ApiProperty({
    type: String,
    description: 'user_id врача  ',
    example: 1,
  })
  @IsString()
  @ValidateIf((o) => o.doctor_id)
  doctor_id: string;

  @ApiProperty({
    type: String,
    description: 'Дата и время начала приема',
  })
  @IsString()
  @ValidateIf((o) => o.date_start)
  date_start: string;


  @IsNumber()
  @ApiProperty({
    type: Number,
    description: 'id medical-history',
    default: 'null',
  })
  @ValidateIf((o) => o.opinion_id)
  opinion_id: number;
}
