import { AbstractDto } from '../../../../common/dto/abstract.dto';
import type { LogbookEntity } from '../entities/logbook.entity';

export class LogbookDto extends AbstractDto {
  constructor(logbookEntity: LogbookEntity) {
    super(logbookEntity);
  }
}
