import { Module } from '@nestjs/common';

import { DeviceModule } from '../device/device.module';
import { LiquidationController } from './controllers/liquidation.controller';
import { LiquidationRepository } from './repositories/liquidation.repository';
import { LiquidationService } from './services/liquidation.service';

@Module({
  imports: [DeviceModule],
  controllers: [LiquidationController],
  exports: [LiquidationService],
  providers: [LiquidationService, LiquidationRepository],
})
export class LiquidationModule {}
