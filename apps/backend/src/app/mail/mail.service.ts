import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

export class AppointmentDto  {
  user_name: string
  doctor_name: string
  date: string
  time: string
  email: string
}

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  //в user вписать тип
  async sendUserConfirmation(user: any, token: string) {
    const url = `example.com/auth/confirm?token=${token}`;

    await this.mailerService.sendMail({
      to: user.email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Welcome to Medical online! Confirm your Email',
      template: './confirmation', // `.hbs` extension is appended automatically
      context: { // ✏️ filling curly brackets with content
        name: 'Anastasia', // user.name,
        url,
      },
    });
  }

  async sendNewAppointment(appointment: AppointmentDto ) {
    console.log('Отправляются письма о новой новости администрации ресурса');
    console.log(appointment)
        await this.mailerService.sendMail({
            to: appointment.email,
            subject: `Новая запись к врачу`,
            template: './appointment',
            context: {
              doctor : appointment.doctor_name,
              patient: appointment.user_name,
              date: appointment.date,
              time: appointment.time
            },
        })
            .then((res) => {
                console.log('res', res);
            })
            .catch((err) => {
                console.log('err', err);
            });

}

}
