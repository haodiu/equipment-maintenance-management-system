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
      .leftJoinAndSelect('logbooks.user', 'user')
      .leftJoinAndSelect('logbooks.device', 'device')
      .leftJoinAndSelect('logbooks.type', 'logbookType')
      .where('logbooks.is_deleted = FALSE')
      .andWhere('logbooks.device_id = :deviceId', { deviceId })
      .getMany();
  }

  async findOneById(id: number): Promise<LogbookEntity | null> {
    return this.createQueryBuilder('logbooks')
      .leftJoinAndSelect('logbooks.user', 'user')
      .leftJoinAndSelect('logbooks.device', 'device')
      .leftJoinAndSelect('logbooks.type', 'logbookType')
      .where('logbooks.is_deleted = FALSE')
      .andWhere('logbooks.id = :id', { id })
      .getOne();
  }

  async findAll(type?: string): Promise<LogbookEntity[]> {
    const query = this.createQueryBuilder('logbooks')
      .leftJoinAndSelect('logbooks.user', 'user')
      .leftJoinAndSelect('logbooks.device', 'device')
      .leftJoinAndSelect('logbooks.type', 'logbookType')
      .where('logbooks.is_deleted = FALSE');

    if (type) {
      query.andWhere('logbookType.type = :type', { type });
    }

    query.orderBy('logbooks.user_id', 'ASC');

    return query.getMany();
  }

  async findLastLogbookByUserId(
    deviceId: number,
  ): Promise<LogbookEntity | null> {
    return this.createQueryBuilder('logbooks')
      .leftJoinAndSelect('logbooks.user', 'user')
      .leftJoinAndSelect('logbooks.device', 'device')
      .leftJoinAndSelect('logbooks.type', 'logbookType')
      .where('logbooks.is_deleted = FALSE')
      .andWhere('logbooks.device_id = :deviceId', { deviceId })
      .orderBy('logbooks.created_at', 'DESC')
      .getOne();
  }
}
