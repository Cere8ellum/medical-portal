import { IsNotEmpty, IsString, ValidateIf, IsEnum , IsDate, IsNumber} from 'class-validator';
import { Status } from '../enum/status.enum';
import { ApiProperty } from '@nestjs/swagger';


export class UpdateAppointmentDto {
  @IsEnum(Status)
  @IsNotEmpty()
  @ApiProperty({
    enum: ['Waiting', 'Cancelled', 'Completed','Started'],
    description: 'Status визита',
    default: 'waiting'
  })
  status: Status

  @IsNumber()
  @ApiProperty({
    type: Number,
    description: 'id medical-history',
    default: 'null'
  })
  @ValidateIf((o) => o.opinion_id)
  opinion_id: number
}
