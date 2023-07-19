import { HttpModule } from '@nestjs/axios';
import type { Provider } from '@nestjs/common';
import { Global, Logger, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { ApiConfigService } from './services/api-config.service';
import { AwsS3Service } from './services/aws-s3.service';
import { GeneratorService } from './services/generator.service';
import { ImageService } from './services/image.service';
import { MailModule } from './services/mail/mail.module';
import { MailService } from './services/mail/mail.service';
import { ValidatorService } from './services/validator.service';

const providers: Provider[] = [
  ApiConfigService,
  ValidatorService,
  AwsS3Service,
  GeneratorService,
  MailService,
  ImageService,
  Logger,
];

@Global()
@Module({
  providers,
  imports: [CqrsModule, MailModule, HttpModule],
  exports: [...providers, CqrsModule, MailModule, HttpModule],
})
export class SharedModule {}
