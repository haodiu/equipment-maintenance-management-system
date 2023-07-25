import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LogbookModule } from '../logbook/logbook.module';
import { UserModule } from '../user/user.module';
import { DeviceController } from './controllers/device.controller';
import { DeviceEntity } from './domains/entities/device.entity';
import { DeviceTypeEntity } from './domains/entities/device-type.entity';
import { DeviceRepository } from './repositories/device.repository';
import { DeviceTypeRepository } from './repositories/device-type.repisitory';
import { DeviceService } from './services/device.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([DeviceEntity, DeviceTypeEntity]),
    LogbookModule,
    UserModule,
  ],
  controllers: [DeviceController],
  exports: [DeviceRepository, DeviceService],
  providers: [DeviceRepository, DeviceService, DeviceTypeRepository],
})
export class DeviceModule {}
