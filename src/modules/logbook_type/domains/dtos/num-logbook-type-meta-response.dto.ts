import { ApiProperty } from '@nestjs/swagger';

import { MetaStatusOkDto } from '../../../../common/dto/meta-status-ok.dto';
import type { NumLogbookByTypeDto } from './num-logbook-type.dto';

export class NumLogbookTypeMetaResponseDto {
  @ApiProperty()
  meta: MetaStatusOkDto;

  @ApiProperty()
  result: { data: NumLogbookByTypeDto[] };
}
