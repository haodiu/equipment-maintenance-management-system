import { HttpStatus } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { DataNull } from '../../../../common/dto/null-data.dto';

class FileSizeLimitMetaResponseDto {
  @ApiProperty({ example: HttpStatus.PAYLOAD_TOO_LARGE })
  statusCode: number;

  @ApiPropertyOptional({ example: 'File size exceeds the maximum allowed' })
  message: string;

  @ApiPropertyOptional({ example: 'FILE_004' })
  error: string;
}

export class FileSizeLimitResponseDto {
  @ApiProperty({
    type: FileSizeLimitMetaResponseDto,
  })
  meta: FileSizeLimitMetaResponseDto;

  @ApiProperty({ type: DataNull })
  result: DataNull;
}
