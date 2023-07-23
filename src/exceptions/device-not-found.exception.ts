import { NotFoundException } from '@nestjs/common';

import { ERROR_DEVICE_NOT_FOUND } from '../filters/constraint-errors';

export class DeviceNotFoundException extends NotFoundException {
  constructor(error?: string) {
    super(ERROR_DEVICE_NOT_FOUND, error);
  }
}
