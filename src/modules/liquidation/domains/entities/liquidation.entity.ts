import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import type { IAbstractEntity } from '../../../../common/abstract.entity';
import { AbstractEntity } from '../../../../common/abstract.entity';
import { DeviceEntity } from '../../../device/domains/entities/device.entity';
import { UserEntity } from '../../../user/domains/entities/user.entity';
import type { LiquidationDto } from '../dtos/liquidation.dto';

export interface ILiquidationEntity extends IAbstractEntity<LiquidationDto> {
  id: number;

  reason: string;

  approved: boolean;

  isDeleted: boolean;
}

@Entity({ name: 'liquidations' })
export class LiquidationEntity
  extends AbstractEntity<LiquidationDto>
  implements ILiquidationEntity
{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  reason: string;

  @Column({ default: false })
  approved: boolean;

  @Column({ default: false })
  isDeleted: boolean;

  @ManyToOne(() => DeviceEntity, (deviceEntity) => deviceEntity.liquidations)
  device: DeviceEntity;

  @ManyToOne(() => UserEntity, (userEntity) => userEntity.liquidations)
  auth: UserEntity;
}
