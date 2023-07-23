import { Injectable, NotFoundException } from '@nestjs/common';

import { DEVICE_STATUS } from '../../../constants/device-status';
import { DeviceResponseDto } from '../domains/dtos/device-response.dto';
import type { InputDeviceDto } from '../domains/dtos/input-device.dto';
import type { DeviceTypeEntity } from '../domains/entities/device-type.entity';
import { DeviceRepository } from '../repositories/device.repository';
import { DeviceTypeRepository } from '../repositories/device-type.repisitory';
import { UserRepository } from './../../user/repositories/user.repository';

@Injectable()
export class DeviceService {
  constructor(
    private readonly deviceRepository: DeviceRepository,
    private readonly deviceTypeRepository: DeviceTypeRepository,
    private readonly userRepository: UserRepository,
  ) {}

  findDeviceTypeById(typeId: number): Promise<DeviceTypeEntity | null> {
    return this.deviceTypeRepository.findById(typeId);
  }

  async createDevice(
    inputDeviceDto: InputDeviceDto,
  ): Promise<DeviceResponseDto> {
    const { typeId, userId } = inputDeviceDto;

    const deviceType = await this.deviceTypeRepository.findById(typeId);

    if (!deviceType) {
      throw new NotFoundException('DeviceType not found');
    }

    const device = this.deviceRepository.create({
      ...inputDeviceDto,
      type: deviceType,
      deviceStatus: userId ? DEVICE_STATUS.IN_USE : DEVICE_STATUS.NOT_USED,
    });

    if (userId) {
      const user = await this.userRepository.findById(userId);

      if (user) {
        device.user = user;
      }
    }

    await this.deviceRepository.save(device);

    return new DeviceResponseDto(device);
  }
}
