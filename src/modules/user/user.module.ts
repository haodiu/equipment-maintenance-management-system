import { forwardRef, Module } from '@nestjs/common';

import { SharedModule } from '../../shared/shared.module';
import { DeviceModule } from '../device/device.module';
import { LogbookModule } from '../logbook/logbook.module';
import { UserController } from './controllers/user.controller';
import { UserRepository } from './repositories/user.repository';
import { UserService } from './services/user.service';

@Module({
  imports: [
    SharedModule,
    forwardRef(() => LogbookModule),
    forwardRef(() => DeviceModule),
  ],
  controllers: [UserController],
  exports: [UserRepository, UserService],
  providers: [UserRepository, UserService],
})
export class UserModule {}
