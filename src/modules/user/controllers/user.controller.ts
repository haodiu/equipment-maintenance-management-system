import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UpdateUserProfileDto } from '../domains/dtos/update-user-profile.dto';
import type { UserDto } from '../domains/dtos/user.dto';
import { UserService } from '../services/user.service';

@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getUser(@Param('id') userId: number) {
    return this.userService.getOneById(userId);
  }

  @Put(':userId/profile')
  @HttpCode(HttpStatus.OK)
  async updateProfile(
    @Param('userId') userId: number,
    @Body() updateUserProfileDto: UpdateUserProfileDto,
  ): Promise<UserDto> {
    return this.userService.updateUserProfile(userId, updateUserProfileDto);
  }
}
