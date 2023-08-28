import { forwardRef, Module } from '@nestjs/common';

import { FileModule } from '../file/file.module';
import { LogbookModule } from '../logbook/logbook.module';
import { UserModule } from '../user/user.module';
import { DeviceTypeController } from './controllers/device-type.controller';
import { DeviceTypeRepository } from './repositories/device-type.repository';
import { DeviceTypeService } from './services/device-type.service';

@Module({
  imports: [
    forwardRef(() => LogbookModule),
    forwardRef(() => UserModule),
    FileModule,
  ],
  controllers: [DeviceTypeController],
  exports: [DeviceTypeService],
  providers: [DeviceTypeRepository, DeviceTypeService],
})
export class DeviceTypeModule {}
