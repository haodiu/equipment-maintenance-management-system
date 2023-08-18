import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { LogbookEntity } from '../entities/logbook.entity';

@Entity({ name: 'logbook_types' })
export class LogbookTypeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  type: string;

  @OneToMany(() => LogbookEntity, (logbookEntity) => logbookEntity.type)
  logbooks: LogbookEntity[];
}
