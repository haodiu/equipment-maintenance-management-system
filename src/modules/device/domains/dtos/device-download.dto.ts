import { ApiPropertyOptional } from '@nestjs/swagger';

import type { DeviceEntity } from '../entities/device.entity';

export class DeviceDownloadDto {
  @ApiPropertyOptional()
  image?: string;

  @ApiPropertyOptional()
  name?: string;

  @ApiPropertyOptional()
  type?: string;

  @ApiPropertyOptional()
  price?: number;

  @ApiPropertyOptional()
  purchaseLocation?: string;

  @ApiPropertyOptional()
  purchaseDate?: string;

  @ApiPropertyOptional()
  status?: string;

  @ApiPropertyOptional()
  user?: string;

  constructor(device: DeviceEntity) {
    this.image = device.image;
    this.name = device.name;
    this.type = device.type.type;
    this.price = device.price;
    this.purchaseLocation = device.purchaseLocation;
    this.purchaseDate = device.purchaseDate;
    this.status = device.deviceStatus;
    this.user = device.user?.name;
  }
}
