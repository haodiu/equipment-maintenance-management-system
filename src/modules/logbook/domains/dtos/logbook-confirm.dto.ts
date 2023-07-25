import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

import { Trim } from '../../../../decorators';

export class LogbookConfirmDto {
  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  confirmed: boolean;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Trim()
  confirmedDescription: string;

  constructor(confirm: boolean, confirmedDescription: string) {
    this.confirmed = confirm;
    this.confirmedDescription = confirmedDescription;
  }
}
