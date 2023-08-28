import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

import { Trim } from '../../../decorators';

export class LoginDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  @Trim()
  readonly email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Trim()
  @Length(6, 40)
  readonly password: string;
}
