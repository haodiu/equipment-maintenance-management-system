import { forwardRef, Inject, Injectable } from '@nestjs/common';

import { DEVICE_STATUS } from '../../../constants/device-status';
import { UserNotFoundException } from '../../../exceptions';
import { DeviceNotFoundException } from '../../../exceptions/device-not-found.exception';
import { DeviceTypeNotFoundException } from '../../../exceptions/device-type-not-found.exception';
import { LogbookService } from '../../logbook/services/logbook.service';
import { UserService } from '../../user/services/user.service';
import { DeviceLogbookDto } from '../domains/dtos/device-logbook.dto';
import { DeviceResponseDto } from '../domains/dtos/device-response.dto';
import type { InputDeviceDto } from '../domains/dtos/input-device.dto';
import type { DeviceEntity } from '../domains/entities/device.entity';
import type { DeviceTypeEntity } from '../domains/entities/device-type.entity';
import { DeviceRepository } from '../repositories/device.repository';
import { DeviceTypeRepository } from '../repositories/device-type.repisitory';

@Injectable()
export class DeviceService {
  constructor(
    private readonly deviceRepository: DeviceRepository,
    private readonly deviceTypeRepository: DeviceTypeRepository,
    private readonly userService: UserService,
    @Inject(forwardRef(() => LogbookService))
    private readonly logbookService: LogbookService,
  ) {}

  findDeviceTypeById(typeId: number): Promise<DeviceTypeEntity | null> {
    return this.deviceTypeRepository.findById(typeId);
  }

  findById(deviceId: number): Promise<DeviceEntity | null> {
    return this.deviceRepository.findById(deviceId);
  }

  async getDetail(deviceId: number): Promise<DeviceResponseDto> {
    const device = await this.deviceRepository.getDetail(deviceId);

    if (!device) {
      throw new DeviceNotFoundException('Device not found');
    }

    return new DeviceResponseDto(device);
  }

  async getAll(): Promise<DeviceResponseDto[]> {
    const devices = await this.deviceRepository.getAll();

    if (!devices || devices.length === 0) {
      throw new DeviceNotFoundException('Devices not found');
    }

    return devices.map((device) => new DeviceResponseDto(device));
  }

  async createDevice(
    inputDeviceDto: InputDeviceDto,
  ): Promise<DeviceResponseDto> {
    const { typeId, userId } = inputDeviceDto;

    const deviceType = await this.deviceTypeRepository.findById(typeId);

    if (!deviceType) {
      throw new DeviceTypeNotFoundException('DeviceType not found');
    }

    const device = this.deviceRepository.create({
      ...inputDeviceDto,
      type: deviceType,
      deviceStatus: userId ? DEVICE_STATUS.IN_USE : DEVICE_STATUS.NOT_USED,
    });

    if (userId) {
      const user = await this.userService.findOneById(userId);

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
      throw new DeviceNotFoundException('Device not found');
    }

    if (typeId) {
      const type = await this.deviceTypeRepository.findById(typeId);

      if (!type) {
        throw new DeviceTypeNotFoundException('DeviceType not found');
      }

      device.type = type;
    }

    if (userId) {
      const user = await this.userService.findOneById(userId);

      if (!user) {
        throw new UserNotFoundException('User not found');
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

  async softDelete(deviceId: number) {
    const device = await this.deviceRepository.findById(deviceId);

    if (!device) {
      throw new DeviceNotFoundException('Device not found');
    }

    device.isDeleted = true;

    await this.deviceRepository.save(device);
  }

  async getDeviceHistory(deviceId: number): Promise<DeviceLogbookDto> {
    const device = await this.deviceRepository.getDetail(deviceId);

    if (!device) {
      throw new DeviceNotFoundException('Device not found');
    }

    const logbookInfoDtos = await this.logbookService.findByDeviceId(deviceId);

    return new DeviceLogbookDto(device, logbookInfoDtos);
  }
}
