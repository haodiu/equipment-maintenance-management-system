import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

import { Trim } from '../../../../decorators';

export class InputDeviceDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Trim()
  name?: string;

  @ApiProperty()
  @IsNumber()
  typeId: number;

  @ApiPropertyOptional()
  @IsNumber()
  userId: number;

  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  @Trim()
  purchaseLocation: string;

  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  @Trim()
  purchaseDate: string;

  @ApiPropertyOptional()
  price: number;

  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  @Trim()
  image: string;
}
