import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

import { EMAIL_ACTIVATION } from '../../../constants';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendUserToken(email: string, token: string) {
    const emailOptions = {
      from: EMAIL_ACTIVATION.FROM,
      subject: EMAIL_ACTIVATION.SUBJECT,
      to: email,
      context: { token },
      template: './email-token',
    };
    await this.mailerService.sendMail(emailOptions);
  }
}
