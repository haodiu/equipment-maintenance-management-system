import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

import { Trim } from '../../../../decorators';

export class LogbookCreateDto {
  @ApiProperty()
  @IsNumber()
  userId: number;

  @ApiProperty()
  @IsNumber()
  deviceId: number;

  @ApiProperty()
  @IsNumber()
  typeId: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Trim()
  description: string;
}
