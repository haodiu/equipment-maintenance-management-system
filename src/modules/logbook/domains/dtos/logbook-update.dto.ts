import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsIn, ValidateNested } from 'class-validator';

import { LogbookStatusType } from './../../../../constants/logbook-status';
import { LogbookConfirmDto } from './logbook-confirm.dto';
export class LogbookUpdateDto {
  @ApiPropertyOptional()
  @IsIn([
    'pending',
    'confirmed',
    'rejected',
    'in_progress',
    'completed',
    'canceled',
  ])
  status?: LogbookStatusType;

  @ApiPropertyOptional()
  @ValidateNested()
  @Type(() => LogbookConfirmDto)
  confirm?: LogbookConfirmDto;
}
