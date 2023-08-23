import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsString } from 'class-validator';

import { Trim } from '../../../../decorators';
import { LogbookStatusType } from './../../../../constants/logbook-status';
export class LogbookUpdateStatusDto {
  @ApiProperty()
  @IsIn([
    'Đang chờ',
    'Đã xác nhận',
    'Đã từ chối',
    'Đang thực hiện',
    'Đã hoàn thành',
    'Đã huỷ',
  ])
  readonly status: LogbookStatusType;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Trim()
  readonly timePlaned: string;
}
