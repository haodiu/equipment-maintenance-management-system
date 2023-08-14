import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNumberString,
  IsOptional,
  IsString,
  Length,
  Matches,
  ValidateIf,
} from 'class-validator';

import { IsNullable } from '../../../../decorators';
import { Trim } from '../../../../decorators/transform.decorators';

export class UpdateUserProfileDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNullable()
  @IsString()
  @IsNumberString()
  @Length(10, 10)
  readonly phone: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNullable()
  @IsString()
  @IsNumberString()
  @Length(12, 12)
  readonly citizenId: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNullable()
  @IsString()
  @Trim()
  readonly name: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNullable()
  @IsString()
  @Trim()
  readonly gender: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Trim()
  @ValidateIf((o) => o.birthday !== null && o.birthday !== undefined)
  @Matches(/^(0?[1-9]|[12]\d|3[01])\/(0?[1-9]|1[0-2])\/\d{4}$/, {
    message: 'Invalid date format. Use dd/mm/yyyy.',
    each: true,
    always: false,
  })
  readonly birthday: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNullable()
  @IsString()
  @Trim()
  readonly address: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNullable()
  @IsString()
  @Trim()
  readonly avatar: string;
}
