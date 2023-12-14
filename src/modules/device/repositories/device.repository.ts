import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import type { PageOptionsDto } from '../../../common/dto/page-options.dto';
import type { InputDeviceDto } from '../domains/dtos/input-device.dto';
import { DeviceEntity } from '../domains/entities/device.entity';

@Injectable()
export class DeviceRepository extends Repository<DeviceEntity> {
  constructor(private dataSource: DataSource) {
    super(DeviceEntity, dataSource.createEntityManager());
  }

  async updateOne(id: number, inputDeviceDto: InputDeviceDto) {
    return this.createQueryBuilder()
      .update(DeviceEntity)
      .set(inputDeviceDto)
      .where('id = :id', { id })
      .execute();
  }

  async findById(id: number): Promise<DeviceEntity | null> {
    return this.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });
  }

  async findDetail(deviceId: number): Promise<DeviceEntity | null> {
    return this.createQueryBuilder('devices')
      .select('devices')
      .leftJoinAndSelect('devices.type', 'deviceTypes')
      .leftJoinAndSelect('devices.user', 'users')
      .where('devices.id = :deviceId', { deviceId })
      .andWhere('devices.is_deleted = FALSE')
      .getOne();
  }

  async findAll(): Promise<DeviceEntity[] | null> {
    return this.createQueryBuilder('devices')
      .select('devices')
      .leftJoinAndSelect('devices.type', 'deviceTypes')
      .leftJoinAndSelect('devices.user', 'users')
      .where('devices.is_deleted = FALSE')
      .orderBy('devices.id', 'ASC')
      .getMany();
  }

  async findAllWithPagination(
    pageOptionsDto: PageOptionsDto,
  ): Promise<DeviceEntity[] | null> {
    const { skip, take, order } = pageOptionsDto;

    const queryBuilder = this.createQueryBuilder('devices');

    // Apply pagination
    queryBuilder.skip(skip).take(take);

    // Apply ordering
    queryBuilder.orderBy('devices.id', order);

    // Execute query
    return queryBuilder.getMany();
  }

  async findAllByUserId(userId: number): Promise<DeviceEntity[] | null> {
    return this.createQueryBuilder('devices')
      .leftJoinAndSelect('devices.type', 'device_types')
      .where('devices.user_id = :userId', { userId })
      .andWhere('devices.is_deleted = FALSE')
      .orderBy('devices.id', 'ASC')
      .getMany();
  }

  async findAllByType(deviceType: string): Promise<[DeviceEntity[], number]> {
    return this.createQueryBuilder('devices')
      .leftJoinAndSelect('devices.type', 'deviceTypes')
      .where('deviceTypes.type = :deviceType', { deviceType })
      .getManyAndCount();
  }
}
