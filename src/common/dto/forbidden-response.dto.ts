import { HttpStatus } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { DataNull } from './null-data.dto';

class ForbiddenMetaResponseDto {
  @ApiProperty({ example: HttpStatus.FORBIDDEN })
  statusCode: number;

  @ApiPropertyOptional({ example: 'Forbidden' })
  message: string;

  @ApiPropertyOptional({ example: '' })
  error: string;
}

export class ForbiddenResponseDto {
  @ApiProperty({
    type: ForbiddenMetaResponseDto,
  })
  meta: ForbiddenMetaResponseDto;

  @ApiProperty({ type: DataNull })
  result: DataNull;
}
