import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import type { Msg } from 'nats';

import { EMAIL_ACTIVATION } from '../../../constants';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendUserAccount(msg: Msg) {
    const information = JSON.parse(msg.data.toString());
    const { name, email, username, password } = information;

    const emailOptions = {
      from: EMAIL_ACTIVATION.FROM,
      subject: EMAIL_ACTIVATION.SUBJECT,
      to: email,
      context: {
        name,
        username,
        password,
      },
      template: './email-account',
    };

    await this.mailerService.sendMail(emailOptions);
  }
}
