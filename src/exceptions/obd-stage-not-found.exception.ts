import { NotFoundException } from '@nestjs/common';

import { ERROR_OBD_STAGE_NOT_FOUND } from '../filters/constraint-errors';

export class ObdStageNotFoundException extends NotFoundException {
  constructor(error?: string) {
    super(ERROR_OBD_STAGE_NOT_FOUND, error);
  }
}
