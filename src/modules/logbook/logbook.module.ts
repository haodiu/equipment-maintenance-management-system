import { forwardRef, Module } from '@nestjs/common';

import { DeviceModule } from '../device/device.module';
import { UserModule } from '../user/user.module';
import { LogbookController } from './controllers/logbook.controller';
import { LogbookRepository } from './repositories/logbook.repository';
import { LogbookTypeRepository } from './repositories/logbook-type.repository';
import { LogbookService } from './services/logbook.service';

@Module({
  imports: [forwardRef(() => UserModule), forwardRef(() => DeviceModule)],
  controllers: [LogbookController],
  exports: [LogbookService],
  providers: [LogbookService, LogbookRepository, LogbookTypeRepository],
})
export class LogbookModule {}
