import { ForbiddenException } from '@nestjs/common';

import { ERROR_FORBBIDEN_RESOURCE } from '../filters/constraint-errors';

export class ForbiddenResourceException extends ForbiddenException {
  constructor(error?: string) {
    super(ERROR_FORBBIDEN_RESOURCE, error);
  }
}
