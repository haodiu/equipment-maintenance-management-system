import { Injectable } from '@nestjs/common';

import { LogbookTypeDto } from '../domains/dtos/logbook-type.dto';
import { NumLogbookByTypeDto } from '../domains/dtos/num-logbook-type.dto';
import type { LogbookTypeEntity } from '../domains/entities/logbook-type.entity';
import { LogbookTypeRepository } from '../repositories/logbook-type.repository';

@Injectable()
export class LogbookTypeService {
  constructor(private readonly logbookTypeRepository: LogbookTypeRepository) {}

  findOne(id: number): Promise<LogbookTypeEntity | null> {
    return this.logbookTypeRepository.findById(id);
  }

  findAll(): Promise<LogbookTypeEntity[]> {
    return this.logbookTypeRepository.find({});
  }

  async getLogbookTypes(): Promise<LogbookTypeDto[]> {
    const types = await this.logbookTypeRepository.find();

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!types) {
      throw new Error('LogbookType not found');
    }

    return types.map((logbookType) => new LogbookTypeDto(logbookType));
  }

  async getLogbookTypeCounts(): Promise<NumLogbookByTypeDto[]> {
    const numLogbookByType =
      await this.logbookTypeRepository.getLogbookTypeCounts();

    return numLogbookByType.map(
      (logbookType) => new NumLogbookByTypeDto(logbookType),
    );
  }
}
