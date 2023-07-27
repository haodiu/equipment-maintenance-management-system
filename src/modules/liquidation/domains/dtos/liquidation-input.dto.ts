import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

import { Trim } from '../../../../decorators';

export class LiquidationInputDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Trim()
  readonly reason: string;

  @ApiPropertyOptional()
  @IsNumber()
  readonly deviceId: number;
}
