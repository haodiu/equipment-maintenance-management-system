import { forwardRef, Module } from '@nestjs/common';

import { DeviceModule } from '../device/device.module';
import { UserModule } from '../user/user.module';
import { LogbookTypeController } from './controllers/logbook-type.controller';
import { LogbookTypeRepository } from './repositories/logbook-type.repository';
import { LogbookTypeService } from './services/logbook-type.service';

@Module({
  imports: [forwardRef(() => UserModule), forwardRef(() => DeviceModule)],
  controllers: [LogbookTypeController],
  exports: [LogbookTypeService],
  providers: [LogbookTypeRepository, LogbookTypeService],
})
export class LogbookTypeModule {}
