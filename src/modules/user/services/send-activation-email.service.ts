import { Injectable, Logger } from '@nestjs/common';
import type { Msg } from 'nats';

import { TOPIC_NAME } from '../../../constants';
import { MailService } from '../../../shared/services/mail/mail.service';
import { NatsService } from '../../../shared/services/nats.service';

@Injectable()
export class SendActivationEmailService {
  private readonly logger = new Logger(SendActivationEmailService.name);

  constructor(
    private mailService: MailService,
    private natsService: NatsService,
  ) {}

  /**
   * Subscribes to NATS subject and publishes a message on module initialization.
   */
  onModuleInit() {
    this.natsService.subscribe(TOPIC_NAME.GENERAL_SENTE, (msg: Msg) =>
      this.handleIncomingMessage(msg),
    );
  }

  /**
   * Handles incoming NATS messages and performs corresponding actions.
   * @param msg - The incoming message.
   */
  async handleIncomingMessage(msg: Msg): Promise<void> {
    this.logger.log(`Received message for subject ${msg.subject}: ${msg.data}`);

    /**
     * Sends an account activation email to the user.
     * @param msg - The incoming message.
     */
    switch (msg.subject) {
      case TOPIC_NAME.UPDATE_USER_OFFICIAL: {
        await this.mailService.sendUserAccount(msg);
        break;
      }

      case TOPIC_NAME.UPDATE_NOTIFICATION: {
        //Do sth
        break;
      }

      case TOPIC_NAME.UPDATE_MISSION: {
        //Do sth
        break;
      }

      default: {
        this.logger.warn('Unknown topics');
      }
    }
  }
}
