import { ApiProperty } from '@nestjs/swagger';

import type { DeviceTypeEntity } from '../entities/device-type.entity';

export class DeviceTypeDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  type: string;

  constructor(deviceType: DeviceTypeEntity) {
    this.id = deviceType.id;
    this.type = deviceType.type;
  }
}
