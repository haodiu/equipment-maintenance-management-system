import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

import { Trim } from '../../../../decorators/transform.decorators';

export class ChangePasswordDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Trim()
  @Length(6, 40)
  readonly oldPassword: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Trim()
  @Length(6, 40)
  readonly newPassword: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Trim()
  @Length(6, 40)
  readonly confirmPassword: string;
}
