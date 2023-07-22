import type { DataSource } from 'typeorm';
import { Repository } from 'typeorm';

import { DeviceEntity } from '../domains/entities/device.entity';

export class DeviceRepository extends Repository<DeviceEntity> {
  constructor(private dataSource: DataSource) {
    super(DeviceEntity, dataSource.createEntityManager());
  }
}
