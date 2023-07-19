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
import { MaintenanceTypeEntity } from './maintenance-type.entity';

@Entity({ name: 'maintenances' })
export class MaintenanceRequestEntity extends AbstractEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type_id: number;

  @Column()
  staff_id: number;

  @Column()
  device_id: number;

  @Column({ length: 255 })
  description: string;

  @Column({ length: 50 })
  status: string;

  @Column()
  confirmed: boolean;

  @ManyToOne(() => MaintenanceTypeEntity)
  @JoinColumn({ name: 'id' })
  type: MaintenanceTypeEntity;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'id' })
  staff: UserEntity;

  @ManyToOne(() => DeviceEntity)
  @JoinColumn({ name: 'id' })
  device: DeviceEntity;
}
