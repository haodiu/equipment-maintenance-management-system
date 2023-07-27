import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn } from 'class-validator';

export class LiquidationQueryDto {
  @ApiPropertyOptional()
  @IsIn([undefined, 'TRUE', 'FALSE'])
  readonly isApproved?: string;
}
