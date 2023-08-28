import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

import { Trim } from '../../../decorators';

export class ResetPasswordDto {
  @ApiProperty()
  @IsEmail()
  @Trim()
  readonly email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Trim()
  readonly token: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Trim()
  @Length(6, 40)
  readonly newPassword: string;
}
