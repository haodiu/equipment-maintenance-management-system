import { ApiProperty } from '@nestjs/swagger';

import type { LogbookEntity } from '../entities/logbook.entity';

export class LogbookInfoDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  status: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  confirmed: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor(logbook: LogbookEntity) {
    this.id = logbook.id;
    this.status = logbook.status;
    this.description = logbook.description;
    this.type = logbook.type.type;
    this.confirmed = logbook.confirmed;
    this.createdAt = logbook.createdAt;
    this.updatedAt = logbook.updatedAt;
  }
}
