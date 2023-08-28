import { HttpStatus } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { DataNull } from '../../../../common/dto/null-data.dto';
class DeviceNotFoundMetaResponseDto {
  @ApiProperty({ example: HttpStatus.NOT_FOUND })
  statusCode: number;

  @ApiPropertyOptional({ example: 'Device Not Found' })
  message: string;

  @ApiPropertyOptional({ example: 'DEVICE_001' })
  error: string;
}

export class DeviceNotFoundResponseDto {
  @ApiProperty({
    type: DeviceNotFoundMetaResponseDto,
  })
  meta: DeviceNotFoundMetaResponseDto;

  @ApiProperty({ type: DataNull })
  result: DataNull;
}
