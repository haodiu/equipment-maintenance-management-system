import type { JwtService } from '@nestjs/jwt';

import { validateHash } from '../../../common/utils';
import { UserNotFoundException } from '../../../exceptions';
import { Unauthorized } from '../../../exceptions/unauthorized.exception';
import type { IJwtClaims } from '../../../interfaces/IJwtClaims';
import type { ApiConfigService } from '../../../shared/services/api-config.service';
import type { LoginDto } from '../../user/domains/dtos/login.dto';
import { LoginResponseDto } from '../../user/domains/dtos/login-response.dto';
import type { UserService } from '../../user/services/user.service';

export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly apiConfigService: ApiConfigService,
  ) {}

  generateAccessToken(payload: IJwtClaims): string {
    return this.jwtService.sign(payload, {
      secret: this.apiConfigService.authConfig.accessTokenPrivateKey,
      expiresIn: this.apiConfigService.authConfig.accessTokenExpirationTime,
    });
  }

  async validateAdminSignIn(credential: LoginDto): Promise<LoginResponseDto> {
    const user = await this.userService.findOneByEmail('user@gmail.com');

    if (!user) {
      throw new UserNotFoundException('Admin not found');
    }

    const isPasswordValid = await validateHash(
      credential.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new Unauthorized('Invalid credentials');
    }

    const payload: IJwtClaims = {
      id: user.id,
      role: user.role,
    };

    const accessToken = this.generateAccessToken(payload);

    return new LoginResponseDto(user, accessToken);
  }
}
