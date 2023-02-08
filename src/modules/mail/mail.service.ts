import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {
  }

  async sendMail(email: string, confirmLink: string, username: string) {
    await this.mailerService.sendMail({
      to: `${email}`,
      subject: 'Confirm the account',
      template: './confirmation',
      html: `<p>Hey ${username},</p>
             <p>Please click below to confirm your email</p>
             <p>
                <a href="${confirmLink}">Confirm</a>
             </p>
             <p>If you did not request this email you can safely ignore it.</p>`,
      // context: {
      //   username: username,
      //   url: confirmLink,
      // },
    });
  }
}
