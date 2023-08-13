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

  async getDeviceTypeCounts(): Promise<
    Array<{ typeName: string; count: number }>
  > {
    const queryResult = await this.createQueryBuilder('deviceType')
      .leftJoinAndSelect('deviceType.devices', 'devices')
      .select('deviceType.type')
      .addSelect('COUNT(devices.id)', 'count')
      .groupBy('deviceType.id')
      .getRawMany();

    return queryResult.map((result) => ({
      typeName: result.deviceType_type,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      count: Number.parseInt(result.count, 10),
    }));
  }
}
