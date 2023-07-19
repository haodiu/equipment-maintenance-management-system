import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';

import { OderType, ORDER, PAGING_LIMIT } from '../../constants';

export class PageCursorDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  readonly cursor: number;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  readonly take: number = PAGING_LIMIT;

  @IsEnum(ORDER)
  readonly sort: OderType = ORDER.DESC;
}
