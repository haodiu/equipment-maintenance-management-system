import { ApiProperty } from '@nestjs/swagger';

import { MetaStatusOkDto } from '../../../../common/dto/meta-status-ok.dto';
import type { LogbookDto } from './logbook.dto';

export class LogbooksMetaResponseDto {
  @ApiProperty()
  meta: MetaStatusOkDto;

  @ApiProperty()
  result: { data: LogbookDto[] };
}
