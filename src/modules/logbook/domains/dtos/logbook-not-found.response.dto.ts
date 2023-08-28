import { HttpStatus } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { DataNull } from '../../../../common/dto/null-data.dto';
class LogbookNotFoundMetaResponseDto {
  @ApiProperty({ example: HttpStatus.NOT_FOUND })
  statusCode: number;

  @ApiPropertyOptional({ example: 'User Not Found' })
  message: string;

  @ApiPropertyOptional({ example: 'USER_001' })
  error: string;
}

export class LogbookNotFoundResponseDto {
  @ApiProperty({
    type: LogbookNotFoundMetaResponseDto,
  })
  meta: LogbookNotFoundMetaResponseDto;

  @ApiProperty({ type: DataNull })
  result: DataNull;
}
