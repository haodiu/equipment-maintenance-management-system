import { ApiProperty } from '@nestjs/swagger';

import type { PageMetaDto } from './page-meta.dto';
import type { PageMetaCursorDto } from './page-meta-cursor.dto';

export class PageDto<T> {
  @ApiProperty({ isArray: true })
  readonly data: T[];

  @ApiProperty()
  readonly meta: PageMetaDto | PageMetaCursorDto;

  constructor(data: T[], meta: PageMetaDto | PageMetaCursorDto) {
    this.data = data;
    this.meta = meta;
  }
}
