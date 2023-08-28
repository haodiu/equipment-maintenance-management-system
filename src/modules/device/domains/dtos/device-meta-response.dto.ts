import { ApiProperty } from '@nestjs/swagger';

import { MetaStatusOkDto } from '../../../../common/dto/meta-status-ok.dto';
import type { DeviceResponseDto } from './device-response.dto';

export class DeviceMetaResponseDto {
  @ApiProperty()
  meta: MetaStatusOkDto;

  @ApiProperty()
  result: { data: DeviceResponseDto };
}
