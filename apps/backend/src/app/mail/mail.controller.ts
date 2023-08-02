import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppointmentDto, MailService } from './mail.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('mail module')
@Controller('mail')
export class MailController {
    constructor(private readonly mailService: MailService) { }

    @ApiOperation({ summary: 'Send confirmation about new appointment' })
    @Post('appointment')
    async sendNewAppointment(@Body() appointment: AppointmentDto,) {
      console.log('data',appointment)
      return await this.mailService.sendNewAppointment(
        appointment
      );
    }
}
