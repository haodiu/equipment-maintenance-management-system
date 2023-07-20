import { AbstractDto } from '../../../../common/dto/abstract.dto';
import type { LiquidationEntity } from '../entities/liquidation.entity';

export class LiquidationDto extends AbstractDto {
  constructor(liquidationEntity: LiquidationEntity) {
    super(liquidationEntity);
  }
}
