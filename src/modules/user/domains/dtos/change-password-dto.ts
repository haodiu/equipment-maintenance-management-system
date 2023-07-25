import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import { Trim } from '../../../../decorators/transform.decorators';

export class ChangePasswordDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Trim()
  readonly oldPassword: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Trim()
  readonly newPassword: string;
}
