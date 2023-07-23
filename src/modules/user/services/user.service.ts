import { Injectable } from '@nestjs/common';

import { generateHash } from '../../../common/utils';
import { ROLE_TYPE } from '../../../constants';
import { UserNotFoundException } from '../../../exceptions';
import type { UserRegisterDto } from '../../auth/dtos/user-register.dto';
import type { UpdateUserProfileDto } from '../domains/dtos/update-user-profile.dto';
import { UserDto } from '../domains/dtos/user.dto';
import type { UserEntity } from '../domains/entities/user.entity';
import { UserRepository } from './../repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getOneById(userId: number): Promise<UserDto | null> {
    const user = await this.userRepository.findOneByFilter({ id: userId });

    if (!user) {
      throw new UserNotFoundException('User not found');
    }

    return new UserDto(user);
  }

  async findOneByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.userRepository.findOneByFilter({ email });

    if (!user) {
      throw new UserNotFoundException('User not found');
    }

    return user;
  }

  async findOneById(id: number): Promise<UserEntity | null> {
    const user = await this.userRepository.findOneByFilter({ id });

    if (!user) {
      throw new UserNotFoundException('User not found');
    }

    return user;
  }

  async createUser(userRegisterDto: UserRegisterDto): Promise<UserDto> {
    const passwordHash = generateHash(userRegisterDto.password);
    const user = this.userRepository.create({
      email: userRegisterDto.email,
      password: passwordHash,
      role: ROLE_TYPE.USER,
    });

    await this.userRepository.save(user);

    return new UserDto(user);
  }

  async updateUserProfile(
    userId: number,
    updateUserProfileDto: UpdateUserProfileDto,
  ): Promise<UserDto> {
    const user = await this.userRepository.findOneByFilter({ id: userId });

    if (!user) {
      throw new UserNotFoundException('User not found');
    }

    const updateUser = this.userRepository.merge(user, updateUserProfileDto);

    await this.userRepository.save(updateUser);

    return new UserDto(updateUser);
  }
}
