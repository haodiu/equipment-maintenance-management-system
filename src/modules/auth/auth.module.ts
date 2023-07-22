import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { ApiConfigService } from '../../shared/services/api-config.service';
import { UserModule } from '../user/user.module';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    UserModule,
    JwtModule.registerAsync({
      global: true,
      inject: [ApiConfigService],
      useFactory: (apiConfigService: ApiConfigService) => ({
        secret: apiConfigService.authConfig.accessTokenPrivateKey,
        signOptions: {
          expiresIn: apiConfigService.authConfig.accessTokenExpirationTime,
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
