import { ServiceUnavailableException as NestServiceUnavailableException } from '@nestjs/common';

import { ERROR_SERVICE_UNAVAILABLE } from '../filters/constraint-errors';

export class ServiceUnavailableException extends NestServiceUnavailableException {
  constructor(error?: string) {
    super(ERROR_SERVICE_UNAVAILABLE, error);
  }
}
