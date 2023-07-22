import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

import { DeviceStatusType } from '../../../../constants/device-status';
import { Trim } from '../../../../decorators';

export class InputDeviceDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Trim()
  name: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @Trim()
  typeId: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsNotEmpty()
  @Trim()
  inUseBy: number;

  @ApiPropertyOptional()
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
