import { ApiPropertyOptional } from '@nestjs/swagger';

import type { LiquidationEntity } from '../entities/liquidation.entity';
export class LiquidationDownloadDto {
  @ApiPropertyOptional()
  id?: number;

  @ApiPropertyOptional()
  reason?: string;

  @ApiPropertyOptional()
  approved?: boolean;

  @ApiPropertyOptional()
  deviceId?: number;

  @ApiPropertyOptional()
  deviceName?: string;

  @ApiPropertyOptional()
  authId?: number;

  @ApiPropertyOptional()
  authName?: string;

  @ApiPropertyOptional()
  authEmail?: string;

  @ApiPropertyOptional()
  createdAt?: Date;

  constructor(liquidation: LiquidationEntity) {
    this.id = liquidation.id;
    this.reason = liquidation.reason;
    this.approved = liquidation.approved;
    this.deviceId = liquidation.device.id;
    this.deviceName = liquidation.device.name;
    this.authId = liquidation.auth.id;
    this.authName = liquidation.auth.name;
    this.authEmail = liquidation.auth.email;
    this.createdAt = liquidation.createdAt;
  }
}
