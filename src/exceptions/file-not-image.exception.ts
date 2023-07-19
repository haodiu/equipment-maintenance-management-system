import { BadRequestException } from '@nestjs/common';

import { ERROR_FILE_NOT_IMAGE } from '../filters/constraint-errors';

export class FileNotImageException extends BadRequestException {
  constructor(error?: string) {
    super(ERROR_FILE_NOT_IMAGE, error);
  }
}
