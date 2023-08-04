import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppointmentDto, MailService } from './mail.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AppointmentEntity } from '../appointment/entities/appointment.entity';

@ApiTags('mail module')
@Controller('mail')
export class MailController {
    constructor(private readonly mailService: MailService) { }

    @ApiOperation({ summary: 'Send confirmation about new appointment' })
    @Post('appointment')
    async sendNewAppointment(@Body() appointment: AppointmentEntity,) {
      console.log('data',appointment)
      return await this.mailService.sendNewAppointment(
        appointment
      );
    }
}
