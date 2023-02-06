import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendMail(email: string, confirmLink: string, username: string) {
    await this.mailerService.sendMail({
      to: `${email}`,
      subject: 'Confirm the account',
      template: './confirmation',
      context: {
        username: username,
        url: confirmLink,
      },
    });
  }
}
