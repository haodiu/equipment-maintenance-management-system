import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { LogbookTypeEntity } from '../domains/entities/logbook-type.entity';

@Injectable()
export class LogbookTypeRepository extends Repository<LogbookTypeEntity> {
  constructor(private dataSource: DataSource) {
    super(LogbookTypeEntity, dataSource.createEntityManager());
  }

  async findById(id: number): Promise<LogbookTypeEntity | null> {
    return this.findOne({
      where: {
        id,
      },
    });
  }
}
