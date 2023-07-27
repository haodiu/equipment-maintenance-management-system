import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { LiquidationEntity } from '../domains/entities/liquidation.entity';

@Injectable()
export class LiquidationRepository extends Repository<LiquidationEntity> {
  constructor(private dataSource: DataSource) {
    super(LiquidationEntity, dataSource.createEntityManager());
  }

  findById(id: number): Promise<LiquidationEntity | null> {
    return this.createQueryBuilder('liquidations')
      .select('liquidations')
      .leftJoinAndSelect('liquidations.device', 'device')
      .leftJoinAndSelect('liquidations.auth', 'users')
      .where('liquidations.id = :id', { id })
      .getOne();
  }

  findAll(isApproved?: string): Promise<LiquidationEntity[] | null> {
    const query = this.createQueryBuilder('liquidations')
      .select('liquidations')
      .leftJoinAndSelect('liquidations.device', 'device')
      .leftJoinAndSelect('liquidations.auth', 'users');

    if (isApproved) {
      query.where('liquidations.approved = :isApproved', { isApproved });
    }

    return query.getMany();
  }

  checkIsApprovedByDeviceId(
    deviceId: number,
  ): Promise<LiquidationEntity | null> {
    return this.createQueryBuilder('liquidations')
      .select('liquidations')
      .leftJoinAndSelect('liquidations.device', 'device')
      .where('liquidations.device_id = :deviceId', { deviceId })
      .andWhere('liquidations.approved = TRUE')
      .getOne();
  }
}
