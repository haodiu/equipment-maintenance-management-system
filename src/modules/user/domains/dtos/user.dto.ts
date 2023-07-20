import { ApiPropertyOptional } from '@nestjs/swagger';

import { AbstractDto } from '../../../../common/dto/abstract.dto';
import type { UserEntity } from '../entities/user.entity';

export class UserDto extends AbstractDto {
  @ApiPropertyOptional()
  id: number;

  @ApiPropertyOptional()
  email: string;

  @ApiPropertyOptional()
  phone: string;

  @ApiPropertyOptional()
  citizenId: string;

  @ApiPropertyOptional()
  name: string;

  @ApiPropertyOptional()
  gender: string;

  @ApiPropertyOptional()
  birthday: string;

  @ApiPropertyOptional()
  address: string;

  @ApiPropertyOptional()
  role: string;

  constructor(userEntity: UserEntity) {
    super(userEntity);
    this.id = userEntity.id;
    this.email = userEntity.email;
    this.phone = userEntity.phone;
    this.citizenId = userEntity.citizenId;
    this.name = userEntity.name;
    this.gender = userEntity.gender;
    this.birthday = userEntity.birthday;
    this.address = userEntity.address;
    this.role = userEntity.role;
  }
}
