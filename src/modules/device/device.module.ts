import { forwardRef, Module } from '@nestjs/common';

import { LogbookModule } from '../logbook/logbook.module';
import { UserModule } from '../user/user.module';
import { DeviceController } from './controllers/device.controller';
import { DeviceRepository } from './repositories/device.repository';
import { DeviceTypeRepository } from './repositories/device-type.repisitory';
import { DeviceService } from './services/device.service';

@Module({
  imports: [forwardRef(() => LogbookModule), forwardRef(() => UserModule)],
  controllers: [DeviceController],
  exports: [DeviceRepository, DeviceService],
  providers: [DeviceRepository, DeviceService, DeviceTypeRepository],
})
export class DeviceModule {}
