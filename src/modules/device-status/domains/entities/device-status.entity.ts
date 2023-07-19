import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'device_status' })
export class DeviceStatusEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: string;
}
