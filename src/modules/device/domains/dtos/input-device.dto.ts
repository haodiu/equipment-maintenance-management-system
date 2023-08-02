import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

import { DeviceStatusType } from '../../../../constants/device-status';
import { IsNullable, Trim } from '../../../../decorators';

export class InputDeviceDto {
  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  @Trim()
  name: string;

  @ApiPropertyOptional()
  @IsNumber()
  typeId: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNullable()
  @IsNumber()
  userId?: number;

  @ApiPropertyOptional({
    type: 'string',
    enum: ['not_used', 'in_use', 'need_repair', 'pending_disposal', 'disposed'],
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Trim()
  deviceStatus?: DeviceStatusType;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Trim()
  purchaseLocation?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Trim()
  purchaseDate?: string;

  @ApiPropertyOptional()
  @IsOptional()
  price?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Trim()
  image?: string;
}
