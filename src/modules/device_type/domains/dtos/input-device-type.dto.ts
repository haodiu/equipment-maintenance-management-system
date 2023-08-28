import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import { Trim } from '../../../../decorators';

export class InputDeviceTypeDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Trim()
  readonly type: string;
}
