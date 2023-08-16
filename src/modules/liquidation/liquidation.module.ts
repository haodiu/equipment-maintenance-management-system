import { Module } from '@nestjs/common';

import { DeviceModule } from '../device/device.module';
import { FileModule } from '../file/file.module';
import { LiquidationController } from './controllers/liquidation.controller';
import { LiquidationRepository } from './repositories/liquidation.repository';
import { LiquidationService } from './services/liquidation.service';

@Module({
  imports: [DeviceModule, FileModule],
  controllers: [LiquidationController],
  exports: [LiquidationService],
  providers: [LiquidationService, LiquidationRepository],
})
export class LiquidationModule {}
