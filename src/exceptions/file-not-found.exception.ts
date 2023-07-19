import { NotFoundException } from '@nestjs/common';

import { ERROR_FILE_NOT_FOUND } from '../filters/constraint-errors';

export class FileNotFoundException extends NotFoundException {
  constructor(error?: string) {
    super(ERROR_FILE_NOT_FOUND, error);
  }
}
