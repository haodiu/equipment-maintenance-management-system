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

  async getLogbookTypeCounts(): Promise<
    Array<{ typeName: string; count: number }>
  > {
    const queryResult = await this.createQueryBuilder('logbookType')
      .leftJoinAndSelect('logbookType.logbooks', 'logbooks')
      .select('logbookType.type')
      .addSelect('COUNT(logbooks.id)', 'count')
      .groupBy('logbookType.id')
      .getRawMany();

    return queryResult.map((result) => ({
      typeName: result.logbookType_type,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      count: Number.parseInt(result.count, 10),
    }));
  }
}
