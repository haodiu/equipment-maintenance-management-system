import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UserRegisterDto } from '../../user/domains/dtos/user-register.dto';
import { UserService } from './../../user/services/user.service';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private userService: UserService) {}

  @Post('register')
  @HttpCode(HttpStatus.OK)
  register(@Body() userRegisterDto: UserRegisterDto) {
    return this.userService.createUser(userRegisterDto);
  }
}
