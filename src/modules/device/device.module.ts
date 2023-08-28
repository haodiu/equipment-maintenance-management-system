import { forwardRef, Module } from '@nestjs/common';

import { DeviceTypeModule } from '../device_type/device-type.module';
import { FileModule } from '../file/file.module';
import { LogbookModule } from '../logbook/logbook.module';
import { UserModule } from '../user/user.module';
import { DeviceController } from './controllers/device.controller';
import { DeviceRepository } from './repositories/device.repository';
import { DeviceService } from './services/device.service';

@Module({
  imports: [
    forwardRef(() => LogbookModule),
    forwardRef(() => UserModule),
    DeviceTypeModule,
    FileModule,
  ],
  controllers: [DeviceController],
  exports: [DeviceService],
  providers: [DeviceService, DeviceRepository],
})
export class DeviceModule {}
