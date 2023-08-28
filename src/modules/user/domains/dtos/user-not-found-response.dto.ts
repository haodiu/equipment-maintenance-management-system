import { HttpStatus } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { DataNull } from '../../../../common/dto/null-data.dto';
class UserNotFoundMetaResponseDto {
  @ApiProperty({ example: HttpStatus.NOT_FOUND })
  statusCode: number;

  @ApiPropertyOptional({ example: 'User Not Found' })
  message: string;

  @ApiPropertyOptional({ example: 'USER_001' })
  error: string;
}

export class UserNotFoundResponseDto {
  @ApiProperty({
    type: UserNotFoundMetaResponseDto,
  })
  meta: UserNotFoundMetaResponseDto;

  @ApiProperty({ type: DataNull })
  result: DataNull;
}
