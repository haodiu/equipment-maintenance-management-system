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

  async getDetail(deviceId: number): Promise<DeviceResponseDto> {
    const device = await this.deviceRepository.getDetail(deviceId);

    if (!device) {
      throw new NotFoundException('Device not found');
    }

    return new DeviceResponseDto(device);
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

  async updateDevice(
    deviceId: number,
    inputDeviceDto: Partial<InputDeviceDto>,
  ): Promise<DeviceResponseDto> {
    const {
      name,
      typeId,
      userId,
      deviceStatus,
      purchaseDate,
      purchaseLocation,
      price,
      image,
    } = inputDeviceDto;

    const device = await this.deviceRepository.findById(deviceId);

    if (!device) {
      throw new NotFoundException('Device not found');
    }

    if (typeId) {
      const type = await this.deviceTypeRepository.findById(typeId);

      if (!type) {
        throw new NotFoundException('DeviceType not found');
      }

      device.type = type;
    }

    if (userId) {
      const user = await this.userRepository.findById(userId);

      if (!user) {
        throw new NotFoundException('User not found');
      }

      device.user = user;
    }

    // Update the device properties with object destructuring
    device.name = name ?? device.name;
    device.deviceStatus = deviceStatus ?? device.deviceStatus;
    device.purchaseDate = purchaseDate ?? device.purchaseDate;
    device.purchaseLocation = purchaseLocation ?? device.purchaseLocation;
    device.price = price ?? device.price;
    device.image = image ?? device.image;

    await this.deviceRepository.save(device);

    return new DeviceResponseDto(device);
  }
}
