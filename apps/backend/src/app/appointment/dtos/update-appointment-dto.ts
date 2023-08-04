import { IsNotEmpty, IsString, ValidateIf, IsEnum , IsDate} from 'class-validator';
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
}
