import { RoleType } from 'aws-sdk/clients/cognitoidentity';
import { Gender } from 'aws-sdk/clients/polly';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import type { IAbstractEntity } from '../../../../common/abstract.entity';
import { AbstractEntity } from '../../../../common/abstract.entity';
import { DeviceEntity } from '../../../device/domains/entities/device.entity';
import { LiquidationEntity } from '../../../liquidation/domains/entities/liquidation.entity';
import { LogbookEntity } from '../../../logbook/domains/entities/logbook.entity';
import type { UserDto } from '../dtos/user.dto';

export interface IUserEntity extends IAbstractEntity<UserDto> {
  id: number;

  email: string;

  password: string;

  phone: string;

  name: string;

  gender: Gender;

  birthday: string;

  address: string;

  avatar: string;

  role: RoleType;

  resetPasswordToken: string;

  resetPasswordTokenExpiration: Date;

  isDeleted: boolean;
}

@Entity({ name: 'users' })
export class UserEntity extends AbstractEntity<UserDto> implements IUserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true, unique: true })
  citizenId: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  gender: Gender;

  @Column({ nullable: true })
  birthday: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  avatar: string;

  @Column()
  role: RoleType;

  @Column({ nullable: true })
  resetPasswordToken: string;

  @Column({ nullable: true })
  resetPasswordTokenExpiration: Date;

  @Column({ default: false })
  isDeleted: boolean;

  @OneToMany(() => DeviceEntity, (device: DeviceEntity) => device.user)
  devices: DeviceEntity[];

  @OneToMany(() => LogbookEntity, (logbookEntity) => logbookEntity.user)
  logbooks: LogbookEntity[];

  @OneToMany(
    () => LiquidationEntity,
    (liquidationEnity) => liquidationEnity.auth,
  )
  liquidations: LiquidationEntity[];
}
