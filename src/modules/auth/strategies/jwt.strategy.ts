import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { UserNotFoundException } from '../../../exceptions';
import { Unauthorized } from '../../../exceptions/unauthorized.exception';
import { ApiConfigService } from '../../../shared/services/api-config.service';
import { UserService } from './../../user/services/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt' as const) {
  constructor(
    private apiConfigService: ApiConfigService,
    private userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: apiConfigService.authConfig.accessTokenPrivateKey,
    });
  }

  async validate(payload) {
    const { id, role } = payload;

    if (!role) {
      throw new Unauthorized('Invalid token');
    }

    const user = await this.userService.findOneByFilterOptions({ id });

    if (!user) {
      throw new UserNotFoundException('User not found');
    }

    return user;
  }
}
