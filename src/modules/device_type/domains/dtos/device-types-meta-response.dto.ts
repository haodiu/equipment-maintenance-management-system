import { ApiProperty } from '@nestjs/swagger';

import { MetaResponseDto } from '../../../../common/dto/response.dto';
import type { DeviceTypeDto } from './device-type.dto';

export class DeviceTypesMetaResponseDto {
  @ApiProperty()
  meta: MetaResponseDto;

  @ApiProperty()
  result: { data: DeviceTypeDto[] };
}
