import { BadRequestException } from '@nestjs/common';

import { ERROR_PAGE_TYPE } from '../filters/constraint-errors';

export class PageTypeException extends BadRequestException {
  constructor() {
    super(ERROR_PAGE_TYPE);
  }
}
