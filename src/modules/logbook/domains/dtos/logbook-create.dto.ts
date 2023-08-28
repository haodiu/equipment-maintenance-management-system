import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

import { Trim } from '../../../../decorators';

export class LogbookCreateDto {
  @ApiProperty()
  @IsNumber()
  readonly userId: number;

  @ApiProperty()
  @IsNumber()
  readonly deviceId: number;

  @ApiProperty()
  @IsNumber()
  readonly typeId: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Trim()
  readonly description: string;
}
