import { IsNotEmpty, IsString, ValidateIf, IsEnum , IsDate} from 'class-validator';
import { Status } from '../enum/status.enum';
import { ApiProperty } from '@nestjs/swagger';
import { SrvRecord } from 'dns';

export class CreateAppointmentDto {
  @ApiProperty({
    type: String,
    description: 'id врача  ',
    example: 1
  })
  @IsString()
  @IsNotEmpty()
  doctor_id: number;

  @ApiProperty({
    type: String,
    description: 'id пациента',
    example: 1
  })
  @IsString()
  @IsNotEmpty()
  patient_id: number

  @ApiProperty({
    type: String,
    description: 'Дата и время начала приема'
  })
  @IsDate()
  @IsNotEmpty()
  date_start: string;
}
