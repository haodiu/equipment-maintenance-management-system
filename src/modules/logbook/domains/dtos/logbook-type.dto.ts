import { ApiProperty } from '@nestjs/swagger';

import type { LogbookTypeEntity } from '../entities/logbook-type.entity';

export class LogbookTypeDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  type: string;

  constructor(logbookType: LogbookTypeEntity) {
    this.id = logbookType.id;
    this.type = logbookType.type;
  }
}
