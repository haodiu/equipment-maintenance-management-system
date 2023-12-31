import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import { Trim } from '../../../../decorators/transform.decorators';

export class ChangeAvatarDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Trim()
  readonly avatar: string;
}
