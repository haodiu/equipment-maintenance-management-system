import { ConflictException } from '@nestjs/common';

import { ERROR_USER_CONFLICT } from '../filters/constraint-errors';

export class UserRegisterConflictException extends ConflictException {
  constructor(error?: string) {
    super(ERROR_USER_CONFLICT, error);
  }
}
