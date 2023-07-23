import { ApiProperty } from '@nestjs/swagger';

import type { DeviceEntity } from '../entities/device.entity';
import { DeviceTypeDto } from './device-type.dto';
import { DeviceUserDto } from './device-user.dto';

export class DeviceResponseDto {
  @ApiProperty()
  id?: number;

  @ApiProperty()
  name?: string;

  @ApiProperty()
  image?: string;

  @ApiProperty()
  status?: string;

  @ApiProperty()
  price?: number;

  @ApiProperty()
  purchaseLocation?: string;

  @ApiProperty()
  purchaseDate?: string;

  @ApiProperty()
  type?: DeviceTypeDto;

  @ApiProperty()
  user?: DeviceUserDto;

  constructor(device: Partial<DeviceEntity>) {
    this.id = device.id;
    this.name = device.name;
    this.image = device.image;
    this.status = device.deviceStatus;
    this.price = device.price;
    this.purchaseDate = device.purchaseDate;
    this.purchaseLocation = device.purchaseLocation;
    // Check if device.type is defined before creating DeviceTypeDto
    this.type = device.type ? new DeviceTypeDto(device.type) : undefined;

    // Check if device.user is defined before creating DeviceUserDto
    this.user = device.user ? new DeviceUserDto(device.user) : undefined;
  }
}
