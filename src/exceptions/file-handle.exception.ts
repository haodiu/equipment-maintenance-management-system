import { InternalServerErrorException } from '@nestjs/common';

import { ERROR_FILE_NOT_HANDLE } from '../filters/constraint-errors';

export class FileHandleException extends InternalServerErrorException {
  constructor(error?: string) {
    super(ERROR_FILE_NOT_HANDLE, error);
  }
}
