import { HttpStatus } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { DataNull } from '../../../../common/dto/null-data.dto';

class FileNotFoundMetaResponseDto {
  @ApiProperty({ example: HttpStatus.NOT_FOUND })
  statusCode: number;

  @ApiPropertyOptional({ example: 'File not found' })
  message: string;

  @ApiPropertyOptional({ example: 'FILE_002' })
  error: string;
}

export class FileNotFoundResponseDto {
  @ApiProperty({
    type: FileNotFoundMetaResponseDto,
  })
  meta: FileNotFoundMetaResponseDto;

  @ApiProperty({ type: DataNull })
  result: DataNull;
}
