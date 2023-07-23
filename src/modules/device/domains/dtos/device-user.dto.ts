import { ApiProperty } from '@nestjs/swagger';

import type { UserEntity } from '../../../user/domains/entities/user.entity';

export class DeviceUserDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  name: string;

  constructor(user: UserEntity) {
    this.id = user.id;
    this.email = user.email;
    this.phone = user.phone;
    this.name = user.name;
  }
}
