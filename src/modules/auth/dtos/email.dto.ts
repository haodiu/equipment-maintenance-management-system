import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class EmailDto {
  @ApiProperty()
  @IsEmail()
  readonly email: string;
}
