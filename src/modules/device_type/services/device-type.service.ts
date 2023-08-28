import { Injectable } from '@nestjs/common';

import type { InputDeviceTypeDto } from '../domains/dtos/input-device-type.dto';
import { NumDeviceTypeDto } from '../domains/dtos/num-device-type.dto';
import type { DeviceTypeEntity } from '../domains/entities/device-type.entity';
import { DeviceTypeRepository } from '../repositories/device-type.repository';
import { DeviceTypeDto } from './../domains/dtos/device-type.dto';

@Injectable()
export class DeviceTypeService {
  constructor(private readonly deviceTypeRepository: DeviceTypeRepository) {}

  findById(id: number): Promise<DeviceTypeEntity | null> {
    return this.deviceTypeRepository.findOne({
      where: {
        id,
      },
    });
  }

  async getAllDeviceType(): Promise<DeviceTypeDto[]> {
    const deviceTypes = await this.deviceTypeRepository.find();

    return deviceTypes.map((deviceType) => new DeviceTypeDto(deviceType));
  }

  async getDeviceTypeCounts(): Promise<NumDeviceTypeDto[]> {
    const numDeviceByType =
      await this.deviceTypeRepository.getDeviceTypeCounts();

    return numDeviceByType.map(
      (deviceType) => new NumDeviceTypeDto(deviceType),
    );
  }

  async createDeviceType(deviceTypeDto: InputDeviceTypeDto) {
    const { type } = deviceTypeDto;

    const deviceType = this.deviceTypeRepository.create({ type });

    await this.deviceTypeRepository.save(deviceType);
  }
}
