import { ApiProperty } from '@nestjs/swagger';

import { MetaStatusOkDto } from '../../../common/dto/meta-status-ok.dto';
import type { LoginResponseDto } from './login-response.dto';
export class LoginMetaResponseDto {
  @ApiProperty()
  meta: MetaStatusOkDto;

  @ApiProperty()
  result: { data: LoginResponseDto };
}
