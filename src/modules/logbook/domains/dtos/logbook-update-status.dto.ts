import { ApiProperty } from '@nestjs/swagger';
import { IsIn } from 'class-validator';

import { LogbookStatusType } from './../../../../constants/logbook-status';
export class LogbookUpdateStatusDto {
  @ApiProperty()
  @IsIn([
    'pending',
    'confirmed',
    'rejected',
    'in_progress',
    'completed',
    'canceled',
  ])
  status: LogbookStatusType;
}
