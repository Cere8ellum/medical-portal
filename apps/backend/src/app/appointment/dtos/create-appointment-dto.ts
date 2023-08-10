import { IsNotEmpty, IsString, ValidateIf, IsEnum , IsDate} from 'class-validator';
import { Status } from '../enum/status.enum';
import { ApiProperty } from '@nestjs/swagger';
import { SrvRecord } from 'dns';

export class CreateAppointmentDto {
  @ApiProperty({
    type: String,
    description: 'user_id врача  ',
    example: 1
  })
  @IsString()
  @IsNotEmpty()
  doctor_id: string;

  @ApiProperty({
    type: String,
    description: 'user_id пациента',
    example: 1
  })
  @IsString()
  @IsNotEmpty()
  patient_id: string

  @ApiProperty({
    type: String,
    description: 'Дата и время начала приема'
  })
  @IsString()
  @IsNotEmpty()
  date_start: string;
}
