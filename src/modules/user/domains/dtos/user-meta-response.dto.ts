import { ApiProperty } from '@nestjs/swagger';

import { MetaStatusOkDto } from '../../../../common/dto/meta-status-ok.dto';
import type { UserDto } from './user.dto';

export class UserMetaResponseDto {
  @ApiProperty()
  meta: MetaStatusOkDto;

  @ApiProperty()
  result: { data: UserDto };
}
