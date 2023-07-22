import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import type { UserEntity } from '../../user/domains/entities/user.entity';

export class LoginResponseDto {
  @ApiProperty()
  id: number;

  @ApiPropertyOptional()
  avatar: string;

  @ApiProperty()
  role: string;

  @ApiProperty()
  accessToken: string;

  constructor(user: UserEntity, accessToken: string) {
    this.id = user.id;
    this.avatar = user.avatar;
    this.role = user.role;
    this.accessToken = accessToken;
  }
}
