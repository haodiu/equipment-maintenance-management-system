import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import { Trim } from '../../../../decorators';

export class LiquidationUpdateDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Trim()
  readonly reason: string;
}
