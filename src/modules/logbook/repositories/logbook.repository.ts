import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { LogbookEntity } from '../domains/entities/logbook.entity';

@Injectable()
export class LogbookRepository extends Repository<LogbookEntity> {
  constructor(private dataSource: DataSource) {
    super(LogbookEntity, dataSource.createEntityManager());
  }

  async findByDeviceId(deviceId: number): Promise<LogbookEntity[]> {
    return this.createQueryBuilder('logbooks')
      .select('logbooks')
      .leftJoinAndSelect('logbooks.type', 'logbookType')
      .where('logbooks.device_id = :deviceId', { deviceId })
      .getMany();
  }

  async findOneById(id: number): Promise<LogbookEntity | null> {
    return this.createQueryBuilder('logbooks')
      .select('logbooks')
      .leftJoinAndSelect('logbooks.user', 'user')
      .leftJoinAndSelect('logbooks.device', 'device')
      .leftJoinAndSelect('logbooks.type', 'logbookType')
      .where('logbooks.id = :id', { id })
      .getOne();
  }

  async findAll(type?: string): Promise<LogbookEntity[]> {
    const query = this.createQueryBuilder('logbooks')
      .select('logbooks')
      .leftJoinAndSelect('logbooks.user', 'user')
      .leftJoinAndSelect('logbooks.device', 'device')
      .leftJoinAndSelect('logbooks.type', 'logbookType');

    if (type) {
      query.where('logbookType.type = :type', { type });
    }

    return query.getMany();
  }
}
