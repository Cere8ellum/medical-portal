import { Body, Controller, Get } from '@nestjs/common';
import { AppointmentDto, MailService } from './mail.service';

@Controller('mail')
export class MailController {
    constructor(private readonly mailService: MailService) { }


    @Get('appointment')
    async sendNewAppointment(@Body() appointment: AppointmentDto,) {
      console.log('data',appointment)
      return await this.mailService.sendNewAppointment(
        appointment
      );
    }
}
