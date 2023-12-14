import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { LogbookEntity } from '../domains/entities/logbook.entity';

@Injectable()
export class LogbookRepository extends Repository<LogbookEntity> {
  constructor(private dataSource: DataSource) {
    super(LogbookEntity, dataSource.createEntityManager());
  }

  async findByDeviceId(deviceId: number): Promise<LogbookEntity[]> {
    return this.createQueryBuilder('logbook')
      .leftJoinAndSelect('logbook.user', 'user')
      .leftJoinAndSelect('logbook.device', 'device')
      .leftJoinAndSelect('logbook.type', 'logbookType')
      .where('logbook.is_deleted = FALSE')
      .andWhere('logbook.device_id = :deviceId', { deviceId })
      .orderBy('logbook.updated_at', 'DESC')
      .getMany();
  }

  async findById(id: number): Promise<LogbookEntity | null> {
    return this.createQueryBuilder('logbook')
      .leftJoinAndSelect('logbook.user', 'user')
      .leftJoinAndSelect('logbook.device', 'device')
      .leftJoinAndSelect('logbook.type', 'logbookType')
      .where('logbook.is_deleted = FALSE')
      .andWhere('logbook.id = :id', { id })
      .getOne();
  }

  async findAll(type?: string): Promise<LogbookEntity[]> {
    const query = this.createQueryBuilder('logbook')
      .leftJoinAndSelect('logbook.user', 'user')
      .leftJoinAndSelect('logbook.device', 'device')
      .leftJoinAndSelect('logbook.type', 'logbookType')
      .where('logbook.is_deleted = FALSE');

    if (type) {
      query.andWhere('logbookType.type = :type', { type });
    }

    query.orderBy('logbook.user_id', 'ASC');

    return query.getMany();
  }

  async findLastLogbookByUserId(
    deviceId: number,
  ): Promise<LogbookEntity | null> {
    return this.createQueryBuilder('logbook')
      .leftJoinAndSelect('logbook.user', 'user')
      .leftJoinAndSelect('logbook.device', 'device')
      .leftJoinAndSelect('logbook.type', 'logbookType')
      .where('logbook.is_deleted = FALSE')
      .andWhere('logbook.device_id = :deviceId', { deviceId })
      .orderBy('logbook.created_at', 'DESC')
      .getOne();
  }
}
