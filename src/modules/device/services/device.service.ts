import { forwardRef, Inject, Injectable, Res } from '@nestjs/common';
import { Response } from 'express';

import { DEVICE_STATUS } from '../../../constants/device-status';
import { UserNotFoundException } from '../../../exceptions';
import { DeviceNotFoundException } from '../../../exceptions/device-not-found.exception';
import { DeviceTypeNotFoundException } from '../../../exceptions/device-type-not-found.exception';
import { DeviceTypeService } from '../../device_type/services/device-type.service';
import { FileService } from '../../file/services/file.service';
import { LogbookService } from '../../logbook/services/logbook.service';
import { UserService } from '../../user/services/user.service';
import { DeviceDownloadDto } from '../domains/dtos/device-download.dto';
import { DeviceLogbookDownloadDto } from '../domains/dtos/device-logbook-download.dto';
import { DeviceResponseDto } from '../domains/dtos/device-response.dto';
import type { InputDeviceDto } from '../domains/dtos/input-device.dto';
import type { DeviceEntity } from '../domains/entities/device.entity';
import { DeviceRepository } from '../repositories/device.repository';

@Injectable()
export class DeviceService {
  constructor(
    private readonly deviceRepository: DeviceRepository,
    private readonly userService: UserService,
    private readonly deviceTypeService: DeviceTypeService,
    @Inject(forwardRef(() => LogbookService))
    private readonly logbookService: LogbookService,
    private readonly fileService: FileService,
  ) {}

  /**
   * Find a device entity by its ID.
   *
   * @param {number} deviceId - The ID of the device to find.
   * @returns {Promise<DeviceEntity | null>} A promise that resolves to the found device entity,
   *                                          or null if no device is found.
   */
  findById(deviceId: number): Promise<DeviceEntity | null> {
    return this.deviceRepository.findById(deviceId);
  }

  /**
   * Get detailed information about a device.
   *
   * @param {number} deviceId - The ID of the device to get details for.
   * @returns {Promise<DeviceResponseDto>} A promise that resolves to a DTO containing detailed device information.
   * @throws {DeviceNotFoundException} If the device is not found.
   */
  async getDetail(deviceId: number): Promise<DeviceResponseDto> {
    const device = await this.deviceRepository.findDetail(deviceId);

    if (!device) {
      throw new DeviceNotFoundException('Device not found');
    }

    return new DeviceResponseDto(device);
  }

  /**
   * Get all devices.
   *
   * @returns {Promise<DeviceResponseDto[]>} A promise that resolves to an array of DTOs containing device information.
   * @throws {DeviceNotFoundException} If no devices are found.
   */

  async getAll(): Promise<DeviceResponseDto[]> {
    const devices = await this.deviceRepository.findAll();

    if (!devices) {
      throw new DeviceNotFoundException('Devices not found');
    }

    return devices.map((device) => new DeviceResponseDto(device));
  }

  /**
   * Create a new device entity.
   *
   * @param {InputDeviceDto} inputDeviceDto - Data for creating the new device.
   * @returns {Promise<DeviceResponseDto>} A promise that resolves to a DTO containing the created device information.
   * @throws {DeviceTypeNotFoundException} If the specified device type is not found.
   * @throws {UserNotFoundException} If the specified user is not found.
   */
  async createDevice(
    inputDeviceDto: InputDeviceDto,
  ): Promise<DeviceResponseDto> {
    const { typeId, userId } = inputDeviceDto;

    const deviceType = await this.deviceTypeService.findById(typeId);

    if (!deviceType) {
      throw new DeviceTypeNotFoundException('DeviceType not found');
    }

    const device = this.deviceRepository.create({
      ...inputDeviceDto,
      type: deviceType,
      deviceStatus: userId ? DEVICE_STATUS.IN_USE : DEVICE_STATUS.NOT_USED,
    });

    if (userId) {
      const user = await this.userService.findOneByFilterOptions({
        id: userId,
      });

      if (user) {
        device.user = user;
      }
    }

    await this.deviceRepository.save(device);

    return new DeviceResponseDto(device);
  }

  /**
   * Update a device entity.
   *
   * @param {number} deviceId - The ID of the device to update.
   * @param {Partial<InputDeviceDto>} inputDeviceDto - Data for updating the device.
   * @returns {Promise<DeviceResponseDto>} A promise that resolves to a DTO containing the updated device information.
   * @throws {DeviceNotFoundException} If the device is not found.
   * @throws {DeviceTypeNotFoundException} If the specified device type is not found.
   * @throws {UserNotFoundException} If the specified user is not found.
   */
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
      const type = await this.deviceTypeService.findById(typeId);

      if (!type) {
        throw new DeviceTypeNotFoundException('DeviceType not found');
      }

      device.type = type;
    }

    if (userId === 0) {
      device.user = null;
      device.deviceStatus = DEVICE_STATUS.NOT_USED;
    } else if (userId !== undefined) {
      const user = await this.userService.findOneByFilterOptions({
        id: userId,
      });

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

  /**
   * Save a device entity.
   *
   * @param {DeviceEntity} device - The device entity to save.
   * @returns {Promise<DeviceEntity>} A promise that resolves to the saved device entity.
   */
  saveDevice(device: DeviceEntity) {
    return this.deviceRepository.save(device);
  }

  /**
   * Soft delete a device entity.
   *
   * @param {number} deviceId - The ID of the device to soft delete.
   * @throws {DeviceNotFoundException} If the device is not found.
   * @throws {Error} If the device is in use by a user.
   */
  async softDelete(deviceId: number) {
    const device = await this.deviceRepository.findDetail(deviceId);

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

  /**
   * Get devices associated with a user.
   *
   * @param {number} userId - The ID of the user.
   * @returns {Promise<DeviceResponseDto[]>} A promise that resolves to an array of DTOs containing device information.
   * @throws {DeviceNotFoundException} If no devices are found.
   */
  async getDevicesByUserId(userId: number): Promise<DeviceResponseDto[]> {
    const devices = await this.deviceRepository.findAllByUserId(userId);

    if (!devices) {
      throw new DeviceNotFoundException('Device not found');
    }

    return devices.map((device) => new DeviceResponseDto(device));
  }

  /**
   * Get logbook download information for a device.
   *
   * @param {number} deviceId - The ID of the device.
   * @returns {Promise<DeviceLogbookDownloadDto[]>} A promise that resolves to an array of DTOs containing logbook download information.
   * @throws {LogbookNotFoundException} If no logbooks are found.
   */
  async getLogbooksDownload(
    deviceId: number,
  ): Promise<DeviceLogbookDownloadDto[]> {
    const logbooks = await this.logbookService.getAllEntityByDeviceId(deviceId);

    return logbooks.map((logbook) => new DeviceLogbookDownloadDto(logbook));
  }

  /**
   * Download logbook information for a device.
   *
   * @param {number} liquidationId - The ID of the device.
   * @param {Response} res - Express Response object to send the download.
   */
  async downloadLogbooksInfo(liquidationId: number, @Res() res: Response) {
    const data: DeviceLogbookDownloadDto[] = await this.getLogbooksDownload(
      liquidationId,
    );

    await this.fileService.downloadDeviceLogbooksExcel(data, res);
  }

  /**
   * Get devices download information.
   *
   * @returns {Promise<DeviceDownloadDto[]>} A promise that resolves to an array of DTOs containing device download information.
   * @throws {DeviceNotFoundException} If no devices are found.
   */
  async getDevicesDownload(): Promise<DeviceDownloadDto[]> {
    const devices = await this.deviceRepository.findAll();

    if (!devices) {
      throw new DeviceNotFoundException('Devices not found');
    }

    return devices.map((device) => new DeviceDownloadDto(device));
  }

  /**
   * Download device information.
   *
   * @param {Response} res - Express Response object to send the download.
   */
  async downloadDevicesInfo(@Res() res: Response) {
    const data: DeviceDownloadDto[] = await this.getDevicesDownload();
    await this.fileService.downloadDevicesInfoExcel(data, res);
  }
}
