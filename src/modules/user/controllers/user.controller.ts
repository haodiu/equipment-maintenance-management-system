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
import {
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

import { ForbiddenResponseDto } from '../../../common/dto/forbidden-response.dto';
import { UnauthorizedResponseDto } from '../../../common/dto/unauthorized-response.dto';
import { UnprocessableEntityResponseDto } from '../../../common/dto/unprocessable-entity.dto';
import { ROLE_TYPE } from '../../../constants';
import { Auth, AuthUser } from '../../../decorators';
import type { DeviceResponseDto } from '../../device/domains/dtos/device-response.dto';
import { DevicesMetaResponseDto } from '../../device/domains/dtos/devices-meta-response.dto';
import type { LogbookDto } from '../../logbook/domains/dtos/logbook.dto';
import { LogbookMetaResponseDto } from '../../logbook/domains/dtos/logbook-meta-response.dto';
import { LogbookNotFoundResponseDto } from '../../logbook/domains/dtos/logbook-not-found.response.dto';
import { LogbookService } from '../../logbook/services/logbook.service';
import { ChangePasswordMetaResponseDto } from '../domains/dtos/change-password-meta-response.dto';
import { UpdateUserProfileDto } from '../domains/dtos/update-user-profile.dto';
import { UserDto } from '../domains/dtos/user.dto';
import { UserMetaResponseDto } from '../domains/dtos/user-meta-response.dto';
import { UserNotFoundResponseDto } from '../domains/dtos/user-not-found-response.dto';
import { UsersMetaResponseDto } from '../domains/dtos/users-meta-response.dto';
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
  @ApiOkResponse({
    description: 'Get Users Success',
    type: UsersMetaResponseDto,
  })
  @ApiForbiddenResponse({
    description: 'No Access Permission',
    type: ForbiddenResponseDto,
  })
  @Auth([ROLE_TYPE.MAINTENANCE_STAFF, ROLE_TYPE.USER])
  getDeviceUsers(): Promise<UserDto[] | null> {
    return this.userService.getDeviceUsers();
  }

  @Get('profile')
  @Auth([ROLE_TYPE.MAINTENANCE_STAFF, ROLE_TYPE.USER])
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Get Profile Success',
    type: UserMetaResponseDto,
  })
  @ApiForbiddenResponse({
    description: 'No Access Permission',
    type: ForbiddenResponseDto,
  })
  getProfile(@AuthUser() user: UserEntity): UserDto {
    return this.userService.getProfile(user);
  }

  @Post(':id/change-password')
  @HttpCode(HttpStatus.OK)
  @Auth([ROLE_TYPE.MAINTENANCE_STAFF, ROLE_TYPE.USER])
  @ApiOkResponse({
    description: 'Change Password Success',
    type: ChangePasswordMetaResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    type: UnauthorizedResponseDto,
  })
  @ApiForbiddenResponse({
    description: 'No Access Permission',
    type: ForbiddenResponseDto,
  })
  changePassword(
    @AuthUser() user: UserEntity,
    @Param('id') userId: number,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    return this.userService.changePassword(userId, changePasswordDto, user);
  }

  @Get(':id')
  @Auth([ROLE_TYPE.MAINTENANCE_STAFF])
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Get A User Success',
    type: UserMetaResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    type: UnauthorizedResponseDto,
  })
  @ApiForbiddenResponse({
    description: 'No Access Permission',
    type: ForbiddenResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Not Found',
    type: UserNotFoundResponseDto,
  })
  getUser(@Param('id') userId: number): Promise<UserDto | null> {
    return this.userService.getOneById(userId);
  }

  @Get(':id/logbook')
  @Auth([ROLE_TYPE.MAINTENANCE_STAFF, ROLE_TYPE.USER])
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Get The Last Logbook Success',
    type: LogbookMetaResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    type: UnauthorizedResponseDto,
  })
  @ApiForbiddenResponse({
    description: 'No Access Permission',
    type: ForbiddenResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Not Found',
    type: LogbookNotFoundResponseDto,
  })
  async getAllByUserId(
    @Param('id') userId: number,
  ): Promise<LogbookDto | null> {
    return this.logbookService.getByUserId(userId);
  }

  @Put(':id/profile')
  @Auth([ROLE_TYPE.MAINTENANCE_STAFF, ROLE_TYPE.USER])
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Update Profile Success',
    type: UserMetaResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    type: UnauthorizedResponseDto,
  })
  @ApiForbiddenResponse({
    description: 'No Access Permission',
    type: ForbiddenResponseDto,
  })
  @ApiUnprocessableEntityResponse({
    description: 'Unprocessable Entity',
    type: UnprocessableEntityResponseDto,
  })
  async updateProfile(
    @Param('id') userId: number,
    @Body() updateUserProfileDto: UpdateUserProfileDto,
  ): Promise<UserDto> {
    return this.userService.updateUserProfile(userId, updateUserProfileDto);
  }

  @Get(':id/devices')
  @Auth([ROLE_TYPE.MAINTENANCE_STAFF, ROLE_TYPE.USER])
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Get Devices Success',
    type: DevicesMetaResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    type: UnauthorizedResponseDto,
  })
  @ApiForbiddenResponse({
    description: 'No Access Permission',
    type: ForbiddenResponseDto,
  })
  getDevices(@Param('id') id: number): Promise<DeviceResponseDto[]> {
    return this.userService.getDeviceByUserId(id);
  }
}
