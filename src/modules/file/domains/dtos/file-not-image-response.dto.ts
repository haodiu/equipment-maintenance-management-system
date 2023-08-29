import { HttpStatus } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { DataNull } from '../../../../common/dto/null-data.dto';

class FileNotImageMetaResponseDto {
  @ApiProperty({ example: HttpStatus.BAD_REQUEST })
  statusCode: number;

  @ApiPropertyOptional({ example: 'File not image' })
  message: string;

  @ApiPropertyOptional({ example: 'FILE_001' })
  error: string;
}

export class FileNotImageResponseDto {
  @ApiProperty({
    type: FileNotImageMetaResponseDto,
  })
  meta: FileNotImageMetaResponseDto;

  @ApiProperty({ type: DataNull })
  result: DataNull;
}
