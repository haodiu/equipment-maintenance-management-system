import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'maintenance_type' })
export class MaintenanceTypeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  type: string;
}
