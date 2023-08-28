import { ApiProperty } from '@nestjs/swagger';

import { MetaStatusOkDto } from '../../../../common/dto/meta-status-ok.dto';
import type { LogbookTypeDto } from './logbook-type.dto';

export class LogbookTypeMetaResponseDto {
  @ApiProperty()
  meta: MetaStatusOkDto;

  @ApiProperty()
  result: { data: LogbookTypeDto[] };
}
