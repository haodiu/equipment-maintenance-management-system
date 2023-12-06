import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

import { SuccessMetaResponseDto } from '../../../common/dto/success-response.dto';
import { UnauthorizedResponseDto } from '../../../common/dto/unauthorized-response.dto';
import { UserNotFoundResponseDto } from '../../user/domains/dtos/user-not-found-response.dto';
import { EmailDto } from '../dtos/email.dto';
import { LoginDto } from '../dtos/login.dto';
import { LoginMetaResponseDto } from '../dtos/login-meta-response.dto';
import type { LoginResponseDto } from '../dtos/login-response.dto';
import { ResetPasswordDto } from '../dtos/reset-password.dto';
import { UserRegisterDto } from '../dtos/user-register.dto';
import { AuthService } from '../services/auth.service';
import { UnprocessableEntityResponseDto } from './../../../common/dto/unprocessable-entity.dto';
import { UserService } from './../../user/services/user.service';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Register success',
    type: SuccessMetaResponseDto,
  })
  @ApiUnprocessableEntityResponse({
    description: 'Unprocessable Entity',
    type: UnprocessableEntityResponseDto,
  })
  register(@Body() userRegisterDto: UserRegisterDto) {
    return this.userService.createUser(userRegisterDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Login success',
    type: LoginMetaResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    type: UnauthorizedResponseDto,
  })
  @ApiNotFoundResponse({
    type: UserNotFoundResponseDto,
    description: 'User not found',
  })
  @ApiUnprocessableEntityResponse({
    description: 'Unprocessable Entity',
    type: UnprocessableEntityResponseDto,
  })
  login(@Body() credential: LoginDto): Promise<LoginResponseDto> {
    return this.authService.validateSignIn(credential);
  }

  @Post('/forgot-password')
  @HttpCode(HttpStatus.OK)
  sendTokenToEmail(@Body() emailDto: EmailDto): Promise<void> {
    return this.authService.createForgotPasswordToken(emailDto);
  }

  @Post('/reset-password')
  @HttpCode(HttpStatus.OK)
  resetPassword(@Body() resetPasswordDto: ResetPasswordDto): Promise<void> {
    return this.authService.resetPasswordWithToken(resetPasswordDto);
  }
}
