import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import type { IAbstractEntity } from '../../../../common/abstract.entity';
import { AbstractEntity } from '../../../../common/abstract.entity';
import { DeviceStatusType } from '../../../../constants/device-status';
import { LiquidationEntity } from '../../../liquidation/domains/entities/liquidation.entity';
import { LogbookEntity } from '../../../logbook/domains/entities/logbook.entity';
import { UserEntity } from '../../../user/domains/entities/user.entity';
import type { DeviceDto } from '../dtos/device.dto';
import { DeviceTypeEntity } from './device-type.entity';

export interface IDeviceEntity extends IAbstractEntity<DeviceDto> {
  id: number;

  name: string;

  image: string;

  deviceStatus: DeviceStatusType;

  purchaseLocation: string;

  purchaseDate: string;

  price: number;
}

@Entity({ name: 'devices' })
export class DeviceEntity extends AbstractEntity implements IDeviceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true })
  deviceStatus: DeviceStatusType;

  @Column({ nullable: true })
  purchaseLocation: string;

  @Column({ nullable: true })
  purchaseDate: string;

  @Column({ nullable: true })
  price: number;

  @ManyToOne(() => UserEntity, (userEntity) => userEntity.devices)
  user: UserEntity;

  @ManyToOne(
    () => DeviceTypeEntity,
    (deviceTypeEntity) => deviceTypeEntity.devices,
  )
  type: DeviceTypeEntity;

  @OneToMany(
    () => LiquidationEntity,
    (liquidationEntity) => liquidationEntity.device,
  )
  liquidations: LiquidationEntity[];

  @OneToMany(() => LogbookEntity, (logbookEntity) => logbookEntity.device)
  logbooks: LogbookEntity[];
}
