import { NotFoundException } from '@nestjs/common';

import { ERROR_LIQUIDATION_NOT_FOUNS } from '../filters/constraint-errors';

export class LiquidationNotFoundException extends NotFoundException {
  constructor(error?: string) {
    super(ERROR_LIQUIDATION_NOT_FOUNS, error);
  }
}
