import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

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

  async getDetail(deviceId: number): Promise<DeviceEntity | null> {
    return this.createQueryBuilder('devices')
      .select('devices')
      .leftJoinAndSelect('devices.type', 'deviceTypes')
      .leftJoinAndSelect('devices.user', 'users')
      .where('devices.id = :deviceId', { deviceId })
      .andWhere('devices.is_deleted = FALSE')
      .getOne();
  }

  async getAll(): Promise<DeviceEntity[] | null> {
    return this.createQueryBuilder('devices')
      .select('devices')
      .leftJoinAndSelect('devices.type', 'deviceTypes')
      .leftJoinAndSelect('devices.user', 'users')
      .where('devices.is_deleted = FALSE')
      .orderBy('devices.id', 'ASC')
      .getMany();
  }

  async getAllByUserId(userId: number): Promise<DeviceEntity[] | null> {
    return this.createQueryBuilder('devices')
      .leftJoinAndSelect('devices.type', 'device_types')
      .where('devices.user_id = :userId', { userId })
      .andWhere('devices.is_deleted = FALSE')
      .orderBy('devices.id', 'ASC')
      .getMany();
  }
}
