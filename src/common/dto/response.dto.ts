import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { PageDto } from './page.dto';

export class MetaResponseDto {
  @ApiProperty()
  statusCode: number;

  @ApiPropertyOptional()
  message: string;

  @ApiPropertyOptional()
  error: string;

  constructor(statusCode: number, message?: string, error?: string) {
    this.statusCode = statusCode;
    this.message = message ?? '';
    this.error = error ?? '';
  }
}

export class ResponseDto<T> {
  @ApiProperty()
  result: { data: T } | T;

  @ApiProperty({
    type: MetaResponseDto,
  })
  meta: MetaResponseDto;

  constructor(data: T, meta: MetaResponseDto) {
    this.meta = meta;
    this.result = {
      data,
    };

    if (data instanceof PageDto) {
      this.result = data;
    }
  }
}
