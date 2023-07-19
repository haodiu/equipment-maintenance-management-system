import { int } from 'aws-sdk/clients/datapipeline';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { AbstractEntity } from '../../../../common/abstract.entity';
import { DeviceEntity } from '../../../device/domains/entities/device.entity';

@Entity({ name: 'users' })
export class UserEntity extends AbstractEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  phone: string;

  @Column()
  name: string;

  @Column()
  gender: int;

  @Column()
  birthday: string;

  @Column()
  address: string;

  @Column()
  avatar: string;

  @Column()
  role: string;

  @OneToMany(() => DeviceEntity, (device: DeviceEntity) => device.user)
  device: DeviceEntity[];
}
