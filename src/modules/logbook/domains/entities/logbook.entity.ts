import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import type { IAbstractEntity } from '../../../../common/abstract.entity';
import { AbstractEntity } from '../../../../common/abstract.entity';
import { LogbookStatusType } from '../../../../constants/logbook-status';
import { DeviceEntity } from '../../../device/domains/entities/device.entity';
import { UserEntity } from '../../../user/domains/entities/user.entity';
import type { LogbookDto } from '../dtos/logbook.dto';
import { LogbookTypeEntity } from './logbook-type.entity';

export interface ILogbookEntity extends IAbstractEntity<LogbookDto> {
  id: number;

  description: string;

  status: LogbookStatusType;

  confirmed: boolean;

  isDeleted: boolean;
}

@Entity({ name: 'logbooks' })
export class LogbookEntity
  extends AbstractEntity<LogbookDto>
  implements ILogbookEntity
{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  description: string;

  @Column()
  status: LogbookStatusType;

  @Column({ default: false })
  confirmed: boolean;

  @Column({ nullable: true })
  confirmedDescription: string;

  @Column({ default: false })
  isDeleted: boolean;

  @ManyToOne(
    () => LogbookTypeEntity,
    (logbookTypeEntity) => logbookTypeEntity.logbooks,
  )
  type: LogbookTypeEntity;

  @ManyToOne(() => UserEntity, (userEntity) => userEntity.logbooks)
  user: UserEntity;

  @ManyToOne(() => DeviceEntity, (deviceEntity) => deviceEntity.logbooks)
  device: DeviceEntity;
}
