import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { AbstractEntity } from '../../../../common/abstract.entity';
import { DeviceEntity } from '../../../device/domains/entities/device.entity';
import { MaintenanceTypeEntity } from '../../../maintenance_type/domains/entities/maintenance-type.entity';
import { UserEntity } from '../../../user/domains/entities/user.entity';

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
  @JoinColumn({ name: 'type_id' })
  type: MaintenanceTypeEntity;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => DeviceEntity)
  @JoinColumn({ name: 'device_id' })
  device: DeviceEntity;
}
