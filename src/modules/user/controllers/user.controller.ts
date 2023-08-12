import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ROLE_TYPE } from '../../../constants';
import { Auth, AuthUser } from '../../../decorators';
import type { LogbookDto } from '../../logbook/domains/dtos/logbook.dto';
import { LogbookService } from '../../logbook/services/logbook.service';
import { UpdateUserProfileDto } from '../domains/dtos/update-user-profile.dto';
import type { UserDto } from '../domains/dtos/user.dto';
import { UserEntity } from '../domains/entities/user.entity';
import { UserService } from '../services/user.service';
import { ChangePasswordDto } from './../domains/dtos/change-password-dto';

@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly logbookService: LogbookService,
  ) {}

  @Get('device-users')
  @HttpCode(HttpStatus.OK)
  @Auth([ROLE_TYPE.MAINTENANCE_STAFF, ROLE_TYPE.USER])
  getDeviceUsers(): Promise<UserDto[] | null> {
    return this.userService.getDeviceUser();
  }

  @Get('profile')
  @Auth([ROLE_TYPE.MAINTENANCE_STAFF, ROLE_TYPE.USER])
  @HttpCode(HttpStatus.OK)
  getProfile(@AuthUser() user: UserEntity) {
    return this.userService.getProfile(user);
  }

  @Post(':id/change-password')
  @HttpCode(HttpStatus.OK)
  @Auth([ROLE_TYPE.MAINTENANCE_STAFF, ROLE_TYPE.USER])
  changePassword(
    @AuthUser() user: UserEntity,
    @Param('id') userId: number,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    return this.userService.changePassword(userId, changePasswordDto, user);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getUser(@Param('id') userId: number) {
    return this.userService.getOneById(userId);
  }

  @Get(':id/logbook')
  @HttpCode(HttpStatus.OK)
  async getAllByUserId(
    @Param('id') userId: number,
  ): Promise<LogbookDto | null> {
    return this.logbookService.getByUserId(userId);
  }

  @Put(':id/profile')
  @HttpCode(HttpStatus.OK)
  async updateProfile(
    @Param('id') userId: number,
    @Body() updateUserProfileDto: UpdateUserProfileDto,
  ): Promise<UserDto> {
    return this.userService.updateUserProfile(userId, updateUserProfileDto);
  }

  @Get(':id/devices')
  @Auth([ROLE_TYPE.MAINTENANCE_STAFF, ROLE_TYPE.USER])
  @HttpCode(HttpStatus.OK)
  getDevices(@Param('id') id: number) {
    return this.userService.getDeviceByUserId(id);
  }
}
