import { ApiProperty } from '@nestjs/swagger';

import type { LogbookInfoDto } from '../../../logbook/domains/dtos/logbook-info.dto';
import type { DeviceEntity } from '../entities/device.entity';

export class DeviceLogbookDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  image: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  type: string;

  @ApiProperty()
  logbooks: LogbookInfoDto[];

  constructor(device: DeviceEntity, logbooks: LogbookInfoDto[]) {
    this.id = device.id;
    this.name = device.name;
    this.image = device.image;
    this.status = device.deviceStatus;
    this.price = device.price;
    this.type = device.type.type;
    this.logbooks = logbooks;
  }
}
