import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { LoginDto } from '../../user/domains/dtos/login.dto';
import type { LoginResponseDto } from '../../user/domains/dtos/login-response.dto';
import { UserRegisterDto } from '../../user/domains/dtos/user-register.dto';
import { AuthService } from '../services/auth.service';
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
  register(@Body() userRegisterDto: UserRegisterDto) {
    return this.userService.createUser(userRegisterDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() credential: LoginDto): Promise<LoginResponseDto> {
    return this.authService.validateAdminSignIn(credential);
  }
}
