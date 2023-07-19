import type { OnModuleInit } from '@nestjs/common';
import { Injectable, Logger } from '@nestjs/common';
import type { ConnectionOptions, Msg, NatsConnection } from 'nats';
import { connect as natsConnect } from 'nats';

import { ApiConfigService } from './api-config.service';

@Injectable()
export class NatsService implements OnModuleInit {
  private natsConnection: NatsConnection;

  private readonly logger = new Logger(NatsService.name);

  constructor(public configService: ApiConfigService) {}

  /**
   * Initializes the NATS connection when the module is initialized.
   */
  async onModuleInit() {
    const { url, user, pass } = this.configService.natsConfig;
    const natsConfig: ConnectionOptions = {
      servers: [url],
      reconnect: true,
      user,
      pass,
    };

    try {
      this.natsConnection = await natsConnect(natsConfig);
      this.logger.log(`Connected to NATS successfully`);
    } catch (error) {
      this.logger.error(`Error when connecting to NATS due to ${error}`);
    }
  }

  /**
   * Publishes a message to the specified subject.
   *
   * @param subject - The subject to publish the message to.
   * @param data - The data to be published.
   */
  publish(subject: string, data: string) {
    try {
      this.natsConnection.publish(subject, data);
      this.logger.log(
        `Message published successfully to subject ${subject}: ${data}`,
      );
    } catch (error) {
      this.logger.error(
        `Error publishing message to subject ${subject}: ${error}`,
      );
    }
  }

  /**
   * Subscribes to the specified subject and handles incoming messages with the provided handler function.
   *
   * @param subject - The subject to subscribe to.
   * @param handler - The function to handle incoming messages.
   */
  subscribe(subject: string, handler: (msg: Msg) => Promise<void>) {
    const subscription = this.natsConnection.subscribe(subject);

    const handleIncomingMessage = async (message: Msg) => {
      try {
        await handler(message);
      } catch (error) {
        this.handleMessageError(error);
      }
    };

    const processMessages = async () => {
      try {
        for await (const message of subscription) {
          await handleIncomingMessage(message);
        }
      } catch (error) {
        this.handleSubscriptionError(error);
      }
    };

    processMessages().catch(this.handleSubscriptionError);
  }

  /**
   * Handles errors that occur while handling a message.
   *
   * @param error - The error that occurred.
   */
  handleMessageError = (error: unknown) => {
    this.logger.error(`Error occurred while handling message: ${error}`);
  };

  /**
   * Handles errors that occur while subscribing or iterating through messages.
   *
   * @param error - The error that occurred.
   */
  handleSubscriptionError = (error: unknown) => {
    this.logger.error(
      `Error occurred while subscribing or iterating: ${error}`,
    );
  };
}
