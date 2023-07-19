import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import type { IAbstractEntity } from '../../../../common/abstract.entity';
import { AbstractEntity } from '../../../../common/abstract.entity';
import { DeviceStatusEntity } from '../../../device-status/domains/entities/device-status.entity';
import { DeviceTypeEntity } from '../../../device-type/domains/entities/device-type.entity';
import { DisposalRequestEntity } from '../../../disposal-request/domains/entities/disposal-request.entity';
import { UserEntity } from '../../../user/domains/entities/user.entity';
import type { DeviceDto } from '../dtos/device.dto';

export interface IDeviceEntity extends IAbstractEntity<DeviceDto> {
  id: number;

  name: string;

  image: string;

  purchaseLocation: string;

  purchaseDate: string;

  price: number;
}

@Entity({ name: 'devices' })
export class DeviceEntity extends AbstractEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true })
  purchaseLocation: string;

  @Column({ nullable: true })
  purchase_date: string;

  @Column({ nullable: true })
  price: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => DeviceStatusEntity)
  @JoinColumn({ name: 'status_id' })
  status: DeviceStatusEntity;

  @ManyToOne(() => DeviceTypeEntity)
  @JoinColumn({ name: 'type_id' })
  type: DeviceTypeEntity;

  @OneToMany(
    () => DisposalRequestEntity,
    (disposalRequests: DisposalRequestEntity) => disposalRequests.device,
  )
  disposalRequest: DisposalRequestEntity[];
}
