import { IsNotEmpty, IsString, ValidateIf, IsEnum , IsDate} from 'class-validator';
import { Status } from '../status/status.enum';
import { ApiProperty } from '@nestjs/swagger';
import { SrvRecord } from 'dns';

export class UpdateAppointmentDto {
  @IsEnum(Status)
  @ApiProperty({
    enum: ['Waiting', 'Cancelled', 'Completed','Started'],
    description: 'Status визита',
    default: 'waiting'
  })
  status: Status

  @ApiProperty({
    type: String,
    description: 'id Медицинское заключение визита',
    default: null
  })
  @IsString()
  @ValidateIf((o) => o.medical_history_id)
  medical_history_id: string
}
