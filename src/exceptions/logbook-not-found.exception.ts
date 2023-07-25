import { NotFoundException } from '@nestjs/common';

import { ERROR_LOGBOOK_NOT_FOUND } from '../filters/constraint-errors';

export class LogbookNotFoundException extends NotFoundException {
  constructor(error?: string) {
    super(ERROR_LOGBOOK_NOT_FOUND, error);
  }
}
