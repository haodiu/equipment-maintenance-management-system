import { AbstractDto } from '../../../../common/dto/abstract.dto';
import type { DeviceEntity } from '../entities/device.entity';

export class DeviceDto extends AbstractDto {
  constructor(deviceEntity: DeviceEntity) {
    super(deviceEntity);
  }
}
