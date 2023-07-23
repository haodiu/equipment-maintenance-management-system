import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserRepository } from '../user/repositories/user.repository';
import { DeviceController } from './controllers/device.controller';
import { DeviceEntity } from './domains/entities/device.entity';
import { DeviceRepository } from './repositories/device.repository';
import { DeviceTypeRepository } from './repositories/device-type.repisitory';
import { DeviceService } from './services/device.service';

@Module({
  imports: [TypeOrmModule.forFeature([DeviceEntity])],
  controllers: [DeviceController],
  exports: [DeviceRepository, DeviceService],
  providers: [
    DeviceRepository,
    DeviceService,
    DeviceTypeRepository,
    UserRepository,
  ],
})
export class DeviceModule {}
