import { ApiProperty } from '@nestjs/swagger';

import { AbstractDto } from '../../../../common/dto/abstract.dto';
import type { LiquidationEntity } from '../entities/liquidation.entity';

export class LiquidationDto extends AbstractDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  deviceImage: string;

  @ApiProperty()
  reason: string;

  @ApiProperty()
  approved: boolean;

  @ApiProperty()
  deviceId: number;

  @ApiProperty()
  deviceName: string;

  @ApiProperty()
  authId: number;

  @ApiProperty()
  authName: string;

  @ApiProperty()
  authEmail: string;

  constructor(liquidationEntity: LiquidationEntity) {
    super(liquidationEntity);
    this.id = liquidationEntity.id;
    this.deviceImage = liquidationEntity.device.image;
    this.reason = liquidationEntity.reason;
    this.approved = liquidationEntity.approved;
    this.deviceId = liquidationEntity.device.id;
    this.deviceName = liquidationEntity.device.name;
    this.authId = liquidationEntity.auth.id;
    this.authName = liquidationEntity.auth.name;
    this.authEmail = liquidationEntity.auth.email;
  }
}
