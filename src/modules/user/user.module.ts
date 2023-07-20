import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SharedModule } from '../../shared/shared.module';
import { UserController } from './controllers/user.controller';
import { UserEntity } from './domains/entities/user.entity';
import { UserRepository } from './repositories/user.repository';
import { UserService } from './services/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), SharedModule],
  controllers: [UserController],
  exports: [UserRepository, UserService],
  providers: [UserRepository, UserService],
})
export class UserModule {}
