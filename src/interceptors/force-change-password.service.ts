import type {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
} from '@nestjs/common';
import { Injectable } from '@nestjs/common';

import { ROLE_TYPE } from '../constants';
import { ForceChangePasswordException } from '../exceptions';
import type { UserEntity } from '../modules/user/domains/entities/user.entity';
import { ContextProvider } from '../providers';

@Injectable()
export class ForceChangePasswordInterceptor implements NestInterceptor {
  /**
   * Intercepts the request and checks if the user needs to change their password when they first login.
   * If the user is an admin or the route is excluded, the request is allowed to proceed.
   * If the user needs to change their password, an exception is thrown.
   * If it's an authentication route and a special endpoint for changing password, the request is allowed to proceed.
   * Otherwise, the request is allowed to proceed.
   *
   * @param context The execution context of the request.
   * @param next The next call handler in the chain.
   * @returns The result of the next call handler.
   * @throws UserNotFoundException If the user is not found.
   * @throws ForceChangePasswordException If the user needs to change their password.
   */
  intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();

    // Allow request to proceed if user is an admin or the route is excluded
    if (request.user.role === ROLE_TYPE.ADMIN) {
      return next.handle();
    }

    const user = <UserEntity>ContextProvider.getAuthUser();

    // Check if user needs to change password
    if (user.forceChangePassword) {
      throw new ForceChangePasswordException('Please change your password');
    }

    // Allow request to proceed
    return next.handle();
  }
}
