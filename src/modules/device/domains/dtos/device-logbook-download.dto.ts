import { ApiPropertyOptional } from '@nestjs/swagger';

import type { LogbookEntity } from '../../../logbook/domains/entities/logbook.entity';

export class DeviceLogbookDownloadDto {
  @ApiPropertyOptional()
  deviceId?: number;

  @ApiPropertyOptional()
  deviceName?: string;

  @ApiPropertyOptional()
  status?: string;

  @ApiPropertyOptional()
  description?: string;

  @ApiPropertyOptional()
  logbookType?: string;

  @ApiPropertyOptional()
  confirmed?: boolean;

  @ApiPropertyOptional()
  confirmedDescription?: string;

  @ApiPropertyOptional()
  userName?: string;

  @ApiPropertyOptional()
  userEmail?: string;

  @ApiPropertyOptional()
  createdAt?: Date;

  @ApiPropertyOptional()
  updatedAt?: Date;

  constructor(logbook: LogbookEntity) {
    this.deviceId = logbook.id;
    this.deviceName = logbook.device.name;
    this.status = logbook.status;
    this.description = logbook.description;
    this.logbookType = logbook.type.type;
    this.confirmed = logbook.confirmed;
    this.confirmedDescription = logbook.confirmedDescription;
    this.userName = logbook.user.name;
    this.userEmail = logbook.user.email;
    this.createdAt = logbook.createdAt;
    this.updatedAt = logbook.updatedAt;
  }
}
