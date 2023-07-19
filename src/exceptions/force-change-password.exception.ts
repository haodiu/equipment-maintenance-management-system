import { HttpException } from '@nestjs/common';

import { ERROR_FORCE_CHANGE_PASSWORD } from '../filters/constraint-errors';

export class ForceChangePasswordException extends HttpException {
  constructor(error?: string) {
    super(
      {
        statusCode: 423,
        message: ERROR_FORCE_CHANGE_PASSWORD,
        error: error || 'Force change password required',
      },
      423,
    );
  }
}
