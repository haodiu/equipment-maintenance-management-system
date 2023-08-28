import {
  ForbiddenException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';

import { generateHash, validateHash } from '../../../common/utils';
import { ROLE_TYPE } from '../../../constants';
import { UserNotFoundException } from '../../../exceptions';
import type { UserRegisterDto } from '../../auth/dtos/user-register.dto';
import { DeviceService } from '../../device/services/device.service';
import type { ChangePasswordDto } from '../domains/dtos/change-password-dto';
import type { UpdateUserProfileDto } from '../domains/dtos/update-user-profile.dto';
import { UserDto } from '../domains/dtos/user.dto';
import type { UserEntity } from '../domains/entities/user.entity';
import { UserRepository } from './../repositories/user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    @Inject(forwardRef(() => DeviceService))
    private readonly deviceService: DeviceService,
  ) {}

  async getDeviceUsers(): Promise<UserDto[] | null> {
    const users = await this.userRepository.findManyByRole(ROLE_TYPE.USER);

    if (!users) {
      throw new UserNotFoundException('User not found');
    }

    return users.map((user) => new UserDto(user));
  }

  async getOneById(userId: number): Promise<UserDto | null> {
    const user = await this.userRepository.findOneByFilter({ id: userId });

    if (!user) {
      throw new UserNotFoundException('User not found');
    }

    return new UserDto(user);
  }

  /**
   * Find a user entity by either email or ID.
   *
   * @param {Partial<{ id: number; email: string }>} filterOptions - Filter options to narrow down the search.
   * @returns {Promise<UserEntity | null>} A promise that resolves to the found user entity,
   *                                      or null if no user is found.
   * @throws {UserNotFoundException} If the user is not found.
   */
  async findOneByFilterOptions(
    filterOptions: Partial<{
      id: number;
      email: string;
      resetPasswordToken: string;
    }>,
  ): Promise<UserEntity | null> {
    const user = await this.userRepository.findOneByFilter(filterOptions);

    if (!user) {
      throw new UserNotFoundException('User not found');
    }

    return user;
  }

  async createUser(userRegisterDto: UserRegisterDto) {
    const passwordHash = generateHash(userRegisterDto.password);
    const user = this.userRepository.create({
      email: userRegisterDto.email,
      password: passwordHash,
      role: ROLE_TYPE.USER,
    });

    await this.userRepository.save(user);
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

  setUser(userEntity: UserEntity) {
    return this.userRepository.save(userEntity);
  }

  async changePassword(
    userId: number,
    changePasswordDto: ChangePasswordDto,
    authUser: UserEntity,
  ) {
    if (userId !== authUser.id) {
      throw new ForbiddenException('Only change password yourself');
    }

    const { oldPassword, newPassword, confirmPassword } = changePasswordDto;

    if (newPassword !== confirmPassword) {
      throw new Error('Confirmation password is not the same');
    }

    const isPasswordValid = await validateHash(oldPassword, authUser.password);

    if (!isPasswordValid) {
      throw new Error('Password invalid');
    }

    const newPasswordHash = generateHash(newPassword);

    authUser.password = newPasswordHash;

    await this.userRepository.save(authUser);
  }

  getProfile(user: UserEntity): UserDto {
    return new UserDto(user);
  }

  getDeviceByUserId(userId: number) {
    return this.deviceService.getDevicesByUserId(userId);
  }
}
