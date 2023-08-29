import { HttpStatus } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { DataNull } from '../../../../common/dto/null-data.dto';

class FileNotHandleMetaResponseDto {
  @ApiProperty({ example: HttpStatus.SERVICE_UNAVAILABLE })
  statusCode: number;

  @ApiPropertyOptional({ example: 'File not handle message' })
  message: string;

  @ApiPropertyOptional({ example: 'SYS_003' })
  error: string;
}

export class FileNotHandleResponseDto {
  @ApiProperty({
    type: FileNotHandleMetaResponseDto,
  })
  meta: FileNotHandleMetaResponseDto;

  @ApiProperty({ type: DataNull })
  result: DataNull;
}
