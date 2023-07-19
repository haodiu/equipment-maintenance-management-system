import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { AbstractEntity } from '../../../../common/abstract.entity';
import { DeviceEntity } from '../../../device/domains/entities/device.entity';
import { UserEntity } from '../../../user/domains/entities/user.entity';

@Entity({ name: 'disposal_requests' })
export class DisposalRequestEntity extends AbstractEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  reason: string;

  @Column({ default: false })
  approved: boolean;

  @ManyToOne(
    () => DeviceEntity,
    (device: DeviceEntity) => device.disposalRequest,
  )
  @JoinColumn({ name: 'device_id' })
  device: DeviceEntity;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'create_by' })
  auth: UserEntity;
}