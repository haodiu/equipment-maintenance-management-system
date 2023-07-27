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

  @ApiProperty({ type: () => DeviceTypeDto }) // Use a factory function for DeviceTypeDto to handle the possibility of 'undefined'
  type?: string;

  @ApiProperty({ type: () => DeviceUserDto }) // Use a factory function for DeviceUserDto to handle the possibility of 'undefined'
  user?: DeviceUserDto;

  constructor(device: Partial<DeviceEntity>) {
    this.id = device.id;
    this.name = device.name;
    this.image = device.image;
    this.status = device.deviceStatus;
    this.price = device.price;
    this.purchaseDate = device.purchaseDate;
    this.purchaseLocation = device.purchaseLocation;
    this.type = device.type?.type;
    this.user = device.user ? new DeviceUserDto(device.user) : undefined;
  }
}
