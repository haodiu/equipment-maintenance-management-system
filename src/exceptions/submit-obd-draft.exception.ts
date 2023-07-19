import { BadRequestException } from '@nestjs/common';

import { ERROR_SUBMIT_OBD_DRAFT } from '../filters/constraint-errors';

export class SubmitObdDraftException extends BadRequestException {
  constructor(error?: string) {
    super(ERROR_SUBMIT_OBD_DRAFT, error);
  }
}
