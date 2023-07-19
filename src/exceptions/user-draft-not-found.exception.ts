import { NotFoundException } from '@nestjs/common';

import { ERROR_USER_DRAFT_NOT_FOUND } from '../filters/constraint-errors';

export class UserDraftNotFoundException extends NotFoundException {
  constructor(error?: string) {
    super(ERROR_USER_DRAFT_NOT_FOUND, error);
  }
}
