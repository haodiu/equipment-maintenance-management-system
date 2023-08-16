import { forwardRef, Inject, Injectable, Res } from '@nestjs/common';
import { Response } from 'express';

import { DEVICE_STATUS } from '../../../constants/device-status';
import { UserNotFoundException } from '../../../exceptions';
import { DeviceNotFoundException } from '../../../exceptions/device-not-found.exception';
import { DeviceTypeNotFoundException } from '../../../exceptions/device-type-not-found.exception';
import { LogbookNotFoundException } from '../../../exceptions/logbook-not-found.exception';
import { FileService } from '../../file/services/file.service';
import { LogbookService } from '../../logbook/services/logbook.service';
import { UserService } from '../../user/services/user.service';
import { DeviceLogbookDownloadDto } from '../domains/dtos/device-logbook-download.dto';
import { DeviceResponseDto } from '../domains/dtos/device-response.dto';
import type { InputDeviceDto } from '../domains/dtos/input-device.dto';
import { NumDeviceByTypeDto } from '../domains/dtos/num-device-by-type.dto';
import type { DeviceEntity } from '../domains/entities/device.entity';
import type { DeviceTypeEntity } from '../domains/entities/device-type.entity';
import { DeviceRepository } from '../repositories/device.repository';
import { DeviceTypeRepository } from '../repositories/device-type.repisitory';
import { DeviceTypeDto } from './../domains/dtos/device-type.dto';

@Injectable()
export class DeviceService {
  constructor(
    private readonly deviceRepository: DeviceRepository,
    private readonly deviceTypeRepository: DeviceTypeRepository,
    private readonly userService: UserService,
    @Inject(forwardRef(() => LogbookService))
    private readonly logbookService: LogbookService,
    private readonly fileService: FileService,
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

    if (userId === 0) {
      device.user = null;
      device.deviceStatus = DEVICE_STATUS.NOT_USED;
    } else if (userId !== undefined) {
      const user = await this.userService.findOneById(userId);

      if (!user) {
        throw new UserNotFoundException('User not found');
      }

      device.user = user;
      device.deviceStatus = DEVICE_STATUS.IN_USE;
    }

    // Update the device properties with object destructuring
    device.name = name ?? device.name;
    device.purchaseDate = purchaseDate ?? device.purchaseDate;
    device.purchaseLocation = purchaseLocation ?? device.purchaseLocation;
    device.price = price ?? device.price;
    device.image = image ?? device.image;

    await this.deviceRepository.save(device);

    return new DeviceResponseDto(device);
  }

  async softDelete(deviceId: number) {
    const device = await this.deviceRepository.getDetail(deviceId);

    if (!device) {
      throw new DeviceNotFoundException('Device not found');
    }

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (device.user) {
      throw new Error(
        'Cannot delete the device because it is in use by a user',
      );
    }

    device.isDeleted = true;

    await this.deviceRepository.save(device);
  }

  async getAllDeviceType(): Promise<DeviceTypeDto[]> {
    const deviceTypes = await this.deviceTypeRepository.find();

    return deviceTypes.map((deviceType) => new DeviceTypeDto(deviceType));
  }

  async getDeviceByUserId(userId: number): Promise<DeviceResponseDto[]> {
    const devices = await this.deviceRepository.getAllByUserId(userId);

    if (!devices) {
      throw new DeviceNotFoundException('Device not found');
    }

    return devices.map((device) => new DeviceResponseDto(device));
  }

  async getDeviceTypeCounts(): Promise<NumDeviceByTypeDto[]> {
    const numDeviceByType =
      await this.deviceTypeRepository.getDeviceTypeCounts();

    return numDeviceByType.map(
      (deviceType) => new NumDeviceByTypeDto(deviceType),
    );
  }

  async getLogbooksDownload(
    deviceId: number,
  ): Promise<DeviceLogbookDownloadDto[]> {
    const logbooks = await this.logbookService.getAllEntityByDeviceId(deviceId);

    if (!logbooks) {
      throw new LogbookNotFoundException('Logbooks not found');
    }

    return logbooks.map((logbook) => new DeviceLogbookDownloadDto(logbook));
  }

  async downloadLogbooksInfo(liquidationId: number, @Res() res: Response) {
    const data: DeviceLogbookDownloadDto[] = await this.getLogbooksDownload(
      liquidationId,
    );
    await this.fileService.downloadDeviceLogbooksExcel(data, res);
  }
}
