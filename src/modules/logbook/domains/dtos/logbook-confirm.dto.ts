import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import { Trim } from '../../../../decorators';

export class LogbookConfirmDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Trim()
  readonly confirmedDescription: string;
}
