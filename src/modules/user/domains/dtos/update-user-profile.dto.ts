import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import { Trim } from '../../../../decorators/transform.decorators';

export class UpdateUserProfileDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Trim()
  readonly phone: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Trim()
  readonly citizenId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Trim()
  readonly name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Trim()
  readonly gender: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Trim()
  readonly birthday: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Trim()
  readonly address: string;
}
