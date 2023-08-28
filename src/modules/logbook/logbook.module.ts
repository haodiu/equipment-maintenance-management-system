import { forwardRef, Module } from '@nestjs/common';

import { DeviceModule } from '../device/device.module';
import { LogbookTypeModule } from '../logbook_type/logbook-type.module';
import { UserModule } from '../user/user.module';
import { LogbookController } from './controllers/logbook.controller';
import { LogbookRepository } from './repositories/logbook.repository';
import { LogbookService } from './services/logbook.service';

@Module({
  imports: [
    forwardRef(() => UserModule),
    forwardRef(() => DeviceModule),
    LogbookTypeModule,
  ],
  controllers: [LogbookController],
  exports: [LogbookService],
  providers: [LogbookService, LogbookRepository],
})
export class LogbookModule {}
