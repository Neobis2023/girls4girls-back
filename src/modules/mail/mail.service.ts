import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendMail(email: string, username: string, code: string) {
    await this.mailerService.sendMail({
      to: `${email}`,
      subject: 'Подтвердите аккаунт',
      template: './confirmation',
      html: `<p>Здравствуйте ${username}!</p>
             <p>Ваш код для подтверждения ${code}</p>
             <p>Если вы не запрашивали это письмо, вы можете спокойно его игнорировать.</p>`,
      // context: {
      //   username: username,
      //   url: confirmLink,
      // },
    });
  }

  async sendResponseForUsersFeedback(email: string, content: string) {
    try {
      const mailOptions = {
        to: email,
        subject: 'Ответ за ваш отзыв от GirlsForGirls',
        html: content,
      };
      await this.mailerService.sendMail(mailOptions);
    } catch (error) {
      throw new Error('Error');
    }
  }
}
