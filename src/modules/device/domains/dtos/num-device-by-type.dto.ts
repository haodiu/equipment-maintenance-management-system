import { ApiProperty } from '@nestjs/swagger';

interface IDeviceTypeCount {
  typeName: string;
  count: number;
}

export class NumDeviceByTypeDto {
  @ApiProperty()
  typeName: string;

  @ApiProperty()
  amount: number;

  constructor(deviceTypeCount: IDeviceTypeCount) {
    this.typeName = deviceTypeCount.typeName;
    this.amount = deviceTypeCount.count;
  }
}
