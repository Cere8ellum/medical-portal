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
  doctor_id: string;

  @ApiProperty({
    type: String,
    description: 'id пациента',
    example: 1
  })
  @IsString()
  @IsNotEmpty()
  patient_id: string

  @ApiProperty({
    type: Date,
    description: 'Дата и время начала приема'
  })
  @IsDate()
  @IsNotEmpty()
  date_start: Date;

  @ApiProperty({
    type: String,
    description: 'id Медицинское заключение визита',
    default: null
  })
  @IsString()
  @ValidateIf((o) => o.medical_history_id)
  medical_history_id: string
}
