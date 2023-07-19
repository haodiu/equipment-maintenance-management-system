import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'device_type' })
export class DeviceTypeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;
}
