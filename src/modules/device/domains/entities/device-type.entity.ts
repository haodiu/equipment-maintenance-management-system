import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { DeviceEntity } from './device.entity';

@Entity({ name: 'device_types' })
export class DeviceTypeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @OneToMany(() => DeviceEntity, (deviceEntity) => deviceEntity.type)
  devices: DeviceEntity[];
}
