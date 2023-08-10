import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { AppointmentEntity } from '../appointment/entities/appointment.entity';
import { UserEntity } from '../user/entities/user.entity';


@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  //в user вписать тип
  async sendUserConfirmation(user: UserEntity, token: string) {
    const url = `localhost:3000/api/user/${token}`;

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

  async sendNewAppointment(appointment: AppointmentEntity ) {
        await this.mailerService.sendMail({
            to: appointment.patient.email,
            subject: `Новая запись к врачу`,
            template: './appointment',
            context: {
              doctor : `${appointment.doctor.user.firstname} ${appointment.doctor.user.lastname}`,
              patient: `${appointment.patient.firstname} ${appointment.patient.lastname}`,
              date: appointment.date_start
            },
        })
            .then((res: Response) => {
                console.log(`Письмо о подтверждении записи успешно отправленно на ${appointment.patient.email}`);
            })
            .catch((err) => {
                throw Error(err);
            });

}

}
