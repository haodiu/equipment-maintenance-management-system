import { HttpStatus } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { DataNull } from './null-data.dto';

class UnprocessableEntityMetaResponseDto {
  @ApiProperty({ example: HttpStatus.UNPROCESSABLE_ENTITY })
  statusCode: number;

  @ApiPropertyOptional({ example: 'Unprocessable Entity' })
  message: string;

  @ApiPropertyOptional({ example: 'SYS_002' })
  error: string;
}

export class UnprocessableEntityResponseDto {
  @ApiProperty({
    type: UnprocessableEntityMetaResponseDto,
  })
  meta: UnprocessableEntityMetaResponseDto;

  @ApiProperty({ type: DataNull })
  result: DataNull;
}
