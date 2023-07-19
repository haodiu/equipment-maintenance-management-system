import { AbstractDto } from '../../../../common/dto/abstract.dto';
import type { DisposalRequestEntity } from '../entities/disposal-request.entity';

export class DisposalRequestDto extends AbstractDto {
  constructor(disposalRequestEntity: DisposalRequestEntity) {
    super(disposalRequestEntity);
  }
}
