import { Module } from '@nestjs/common';

import { UserRepository } from '../user/repositories/user.repository';
import { UserService } from '../user/services/user.service';
import { AuthController } from './controllers/auth.controller';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [UserService, UserRepository],
})
export class AuthModule {}
