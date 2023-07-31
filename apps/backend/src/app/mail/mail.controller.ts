import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppointmentDto, MailService } from './mail.service';

@Controller('mail')
export class MailController {
    constructor(private readonly mailService: MailService) { }


    @Post('appointment')
    async sendNewAppointment(@Body() appointment: AppointmentDto,) {
      console.log('data',appointment)
      return await this.mailService.sendNewAppointment(
        appointment
      );
    }
}
