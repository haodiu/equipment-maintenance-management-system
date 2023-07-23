import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

import { DeviceStatusType } from '../../../../constants/device-status';
import { Trim } from '../../../../decorators';

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
  @IsNumber()
  userId: number;

  @ApiPropertyOptional({
    type: 'string',
    enum: ['not_used', 'in_use', 'need_repair', 'pending_disposal', 'disposed'],
  })
  @IsString()
  @IsNotEmpty()
  @Trim()
  deviceStatus: DeviceStatusType;

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
