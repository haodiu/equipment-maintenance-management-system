import { UnauthorizedException } from '@nestjs/common';

import { ERROR_REFRESH_TOKEN_EXPIRED } from '../filters/constraint-errors';
export class ExpiredRefreshTokenException extends UnauthorizedException {
  constructor(error?: string) {
    super(ERROR_REFRESH_TOKEN_EXPIRED, error);
  }
}
