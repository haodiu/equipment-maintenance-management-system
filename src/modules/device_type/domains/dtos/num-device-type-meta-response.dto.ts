import { ApiProperty } from '@nestjs/swagger';

import { MetaResponseDto } from '../../../../common/dto/response.dto';
import type { NumDeviceTypeDto } from './num-device-type.dto';

export class NumDeviceTypeMetaResponseDto {
  @ApiProperty()
  meta: MetaResponseDto;

  @ApiProperty()
  result: { data: NumDeviceTypeDto[] };
}
