import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn } from 'class-validator';

export class LogbookQueryDto {
  @ApiPropertyOptional()
  @IsIn([undefined, 'recall', 'replace', 'repair'])
  readonly type?: string;
}
