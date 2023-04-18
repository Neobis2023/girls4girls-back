import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ApplyStatus } from '../../utils/enum/apply-status.enum';

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

  async respondToFeedback(email: string, message: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Ответ за ваш отзыв от GirlsForGirls',
      html: `<p>${message}</p>`,
    });
  }

  async sendResponseEmailForApplication(
    email: string,
    applyStatus: string,
    program: string,
  ) {
    let response;
    if (applyStatus === ApplyStatus.APPROVED) {
      response = `
        <h2>Поздравляем вас!</h2>
        <p>Ваша подача на программу ${program} одобрена 🎉🎉🎉</p>
      `;
    } else {
      response = `
        <h3>Добрый день!</h3>
        <p>К сожалению ваша подача на программу ${program} была отклонена</p>
        <p>Попробуйте податься на следующий 💪</p>
      `;
    }

    try {
      const mailOptions = {
        to: email,
        subject: 'Ответ на вашу подачу от Girls4Girls',
        html: response,
      };
      await this.mailerService.sendMail(mailOptions);
    } catch (e) {
      throw new Error(e.message);
    }
  }
}
