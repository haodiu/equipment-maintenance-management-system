import { ApiProperty } from '@nestjs/swagger';

import { MetaStatusOkDto } from './meta-status-ok.dto';
import { DataNull } from './null-data.dto';

export class SuccessMetaResponseDto {
  @ApiProperty()
  meta: MetaStatusOkDto;

  @ApiProperty()
  result: DataNull;
}
