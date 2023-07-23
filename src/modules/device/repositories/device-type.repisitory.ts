import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { DeviceTypeEntity } from '../domains/entities/device-type.entity';

@Injectable()
export class DeviceTypeRepository extends Repository<DeviceTypeEntity> {
  constructor(private dataSource: DataSource) {
    super(DeviceTypeEntity, dataSource.createEntityManager());
  }

  async findById(id: number): Promise<DeviceTypeEntity | null> {
    return this.findOne({
      where: {
        id,
      },
    });
  }
}
