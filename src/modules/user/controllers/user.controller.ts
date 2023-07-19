import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiConflictResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiResponse,
  ApiServiceUnavailableResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { ROLE_TYPE } from '../../../constants';
import { Auth, AuthUser } from '../../../decorators';
import { HttpExceptionFilter } from '../../../filters/bad-request.filter';
import { AliasesDto } from '../domains/dtos/aliases.dto';
import { UserAvatarDto } from '../domains/dtos/user-avatar.dto';
import { UserChangePasswordDto } from '../domains/dtos/user-change-password.dto';
import { UserGeneralProfileDto } from '../domains/dtos/user-general-profile.dto';
import { UserInStageDto } from '../domains/dtos/user-in-stage.dto';
import { UserObdFormDto } from '../domains/dtos/user-obd-form.dto';
import { UserProfileDetailDto } from '../domains/dtos/user-profile-detail.dto';
import { UserQueryDto } from '../domains/dtos/user-query.dto';
import { UserRegisterDto } from '../domains/dtos/user-register.dto';
import { UserSubmitObdFormOptionsDto } from '../domains/dtos/user-submit-ob-form-options.dto';
import { UserEntity } from '../domains/entities/user.entity';
import { UserService } from '../services/user.service';

@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @Auth([ROLE_TYPE.ADMIN])
  @HttpCode(HttpStatus.OK)
  @ApiQuery({ name: 'name', required: false })
  @ApiOkResponse({
    description: 'Get users list',
    type: UserInStageDto,
  })
  @UseFilters(HttpExceptionFilter)
  getUsers(@Query() options?: UserQueryDto): Promise<UserInStageDto[]> {
    return this.userService.getUsersGroupByObdStage(options);
  }

  @Get('aliases')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: AliasesDto, description: 'Generate alias' })
  @ApiServiceUnavailableResponse({
    type: AliasesDto,
    description: 'Service Unavailable',
  })
  generateAliases(@Query('fullName') fullName: string): Promise<AliasesDto> {
    return this.userService.generateAliases(fullName);
  }

  @Post('register')
  @HttpCode(HttpStatus.OK)
  @UsePipes(
    new ValidationPipe({
      transform: true,
    }),
  )
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'User register successful',
  })
  @ApiConflictResponse({
    status: HttpStatus.CONFLICT,
    description: 'User information is already exists',
  })
  userRegister(@Body() userRegisterDto: UserRegisterDto) {
    return this.userService.register(userRegisterDto);
  }

  @Get(':id/profile')
  @Auth([ROLE_TYPE.ADMIN])
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Get user profile detail',
    type: UserProfileDetailDto,
  })
  @ApiNotFoundResponse({
    type: String,
    description: 'User not found',
  })
  @ApiUnauthorizedResponse({
    type: String,
    description: 'Unauthorization',
  })
  async getUserProfileDetail(
    @Param('id') userId: number,
  ): Promise<UserProfileDetailDto> {
    return this.userService.getUserProfileDetail(userId);
  }

  @Get(':id/general-profile')
  @Auth([ROLE_TYPE.ADMIN])
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'User General Profile',
    type: UserGeneralProfileDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Not Login Yet',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'No Access Permission',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User Not Found',
  })
  getUserGeneralProfile(
    @Param('id') id: number,
  ): Promise<UserGeneralProfileDto> {
    return this.userService.getUserGeneralProfile(id);
  }

  @Put(':id/obd-form')
  @Auth([ROLE_TYPE.USER])
  @HttpCode(HttpStatus.OK)
  @ApiQuery({ name: 'draft', required: true })
  @ApiOkResponse({ description: 'Successfully update Onboarding form' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorize' })
  async submitObdForm(
    @Body() obd: UserObdFormDto,
    @Param('id') userId: number,
    @Query() options: UserSubmitObdFormOptionsDto,
    @AuthUser() user: UserEntity,
  ): Promise<void> {
    await this.userService.submitObdForm(obd, userId, options, user);
  }

  @Get('/:id/obd-form')
  @Auth([ROLE_TYPE.USER])
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Successfully get onboarding form',
  })
  @ApiNotFoundResponse({
    description: 'Not found onboarding draft form',
  })
  getOnboardingForm(
    @AuthUser() authUser: UserEntity,
    @Param('id') userId: number,
  ): Promise<UserObdFormDto | UserRegisterDto> {
    return this.userService.getOnboardingForm(userId, authUser);
  }

  @Patch('/:id/password')
  @Auth([ROLE_TYPE.USER])
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Password changed successfully' })
  @ApiServiceUnavailableResponse({
    description: 'Service Unvailable',
  })
  @ApiForbiddenResponse({
    description: 'Invalid role ',
  })
  @ApiNotFoundResponse({
    description: 'User not found',
  })
  changePassword(
    @Param('id') userId: number,
    @AuthUser() authUser: UserEntity,
    @Body() userChangePassword: UserChangePasswordDto,
  ) {
    return this.userService.changePassword(
      userId,
      authUser,
      userChangePassword,
    );
  }

  @Put('/:id/avatar')
  @Auth([ROLE_TYPE.USER])
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Successfully Change Avatar' })
  @ApiNotFoundResponse({ description: 'Image not found' })
  async changeAvatar(
    @AuthUser() authUser: UserEntity,
    @Param('id') userId: number,
    @Body() userAvatarDto: UserAvatarDto,
  ) {
    return this.userService.changeAvatar(userId, authUser, userAvatarDto);
  }
}
