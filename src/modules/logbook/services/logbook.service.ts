import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional';

import { DEVICE_STATUS } from '../../../constants/device-status';
import { LOGBOOK_STATUS } from '../../../constants/logbook-status';
import { LOGBOOK_TYPE } from '../../../constants/logbook-type';
import { UserNotFoundException } from '../../../exceptions';
import { DeviceNotFoundException } from '../../../exceptions/device-not-found.exception';
import { DeviceTypeNotFoundException } from '../../../exceptions/device-type-not-found.exception';
import { LogbookNotFoundException } from '../../../exceptions/logbook-not-found.exception';
import { DeviceService } from '../../device/services/device.service';
import { LogbookTypeService } from '../../logbook_type/services/logbook-type.service';
import { UserEntity } from '../../user/domains/entities/user.entity';
import { UserService } from '../../user/services/user.service';
import { LogbookDto } from '../domains/dtos/logbook.dto';
import { LogbookConfirmDto } from '../domains/dtos/logbook-confirm.dto';
import { LogbookCreateDto } from '../domains/dtos/logbook-create.dto';
import type { LogbookQueryDto } from '../domains/dtos/logbook-query.dto';
import { LogbookUpdateStatusDto } from '../domains/dtos/logbook-update-status.dto';
import { LogbookEntity } from '../domains/entities/logbook.entity';
import { LogbookRepository } from '../repositories/logbook.repository';

@Injectable()
export class LogbookService {
  constructor(
    private readonly logbookRepository: LogbookRepository,
    private readonly userService: UserService,
    private readonly logbookTypeService: LogbookTypeService,
    @Inject(forwardRef(() => DeviceService))
    private readonly deviceService: DeviceService,
  ) {}

  async findAllByDeviceId(deviceId: number): Promise<LogbookDto[]> {
    const logbooks = await this.logbookRepository.findByDeviceId(deviceId);

    return logbooks.map((logbook) => new LogbookDto(logbook));
  }

  async getAllEntityByDeviceId(deviceId: number): Promise<LogbookEntity[]> {
    return this.logbookRepository.findByDeviceId(deviceId);
  }

  async findLastOneByDeviceId(deviceId: number): Promise<LogbookDto | null> {
    const logbook = await this.logbookRepository.findLastLogbookByUserId(
      deviceId,
    );

    if (!logbook) {
      throw new LogbookNotFoundException('Logbook not found');
    }

    return new LogbookDto(logbook);
  }

  @Transactional()
  async createLogbook(logbookCreateDto: LogbookCreateDto): Promise<LogbookDto> {
    const { userId, deviceId, typeId, description } = logbookCreateDto;
    const user = await this.userService.findOneByFilterOptions({ id: userId });

    if (!user) {
      throw new UserNotFoundException('User not found');
    }

    const logbookType = await this.logbookTypeService.findOne(typeId);

    if (!logbookType) {
      throw new DeviceTypeNotFoundException('DeviceType not found');
    }

    const device = await this.deviceService.findById(deviceId);

    if (!device) {
      throw new DeviceNotFoundException('Device not found');
    }

    switch (logbookType.type) {
      case LOGBOOK_TYPE.REPAIR: {
        device.deviceStatus = DEVICE_STATUS.NEED_REPAIR;

        break;
      }

      case LOGBOOK_TYPE.RECALL: {
        device.deviceStatus = DEVICE_STATUS.NEED_RECALL;

        break;
      }

      case LOGBOOK_TYPE.REPLACE: {
        device.deviceStatus = DEVICE_STATUS.NEED_REPLACE;

        break;
      }
      // No default
    }

    const logbook = new LogbookEntity();
    logbook.status = LOGBOOK_STATUS.PENDING;
    logbook.description = description;
    logbook.user = user;
    logbook.type = logbookType;
    logbook.device = device;

    await this.deviceService.setDevice(device);

    await this.logbookRepository.save(logbook);

    return new LogbookDto(logbook);
  }

  async getAll(option?: LogbookQueryDto): Promise<LogbookDto[]> {
    const type = option?.type;
    const logbooks = await this.logbookRepository.findAll(type);

    return logbooks.map((logbook) => new LogbookDto(logbook));
  }

  async getOne(logbookId: number): Promise<LogbookDto | null> {
    const logbook = await this.logbookRepository.findById(logbookId);

    if (!logbook) {
      throw new LogbookNotFoundException('Logbook not found');
    }

    return new LogbookDto(logbook);
  }

  @Transactional()
  async confirmLogbookByUser(
    logbookId: number,
    logbookConfirmDto: LogbookConfirmDto,
    authUser: UserEntity,
  ) {
    const logbook = await this.logbookRepository.findById(logbookId);

    if (!logbook) {
      throw new LogbookNotFoundException('Logbook not found');
    }

    if (authUser.id !== logbook.user.id) {
      throw new Error("User only update confirm user's logbook");
    }

    logbook.confirmed = true;
    logbook.confirmedDescription = logbookConfirmDto.confirmedDescription;

    if (
      logbook.status === LOGBOOK_STATUS.COMPLETED &&
      logbook.type.type === LOGBOOK_TYPE.REPAIR
    ) {
      const device = logbook.device;
      device.deviceStatus = DEVICE_STATUS.IN_USE;
      await this.deviceService.setDevice(device);
    }

    await this.logbookRepository.save(logbook);
  }

  @Transactional()
  async updateStatus(
    logbookId: number,
    logbookUpdateStatus: LogbookUpdateStatusDto,
  ): Promise<LogbookDto> {
    const logbook = await this.logbookRepository.findById(logbookId);

    if (!logbook) {
      throw new LogbookNotFoundException('Logbook not found');
    }

    const { status } = logbookUpdateStatus;
    logbook.status = status;

    const device = await this.deviceService.findById(logbook.device.id);

    if (!device) {
      throw new DeviceNotFoundException('Device not found');
    }

    if (
      logbook.status === LOGBOOK_STATUS.COMPLETED &&
      logbook.type.type !== LOGBOOK_TYPE.REPAIR
    ) {
      device.deviceStatus = DEVICE_STATUS.NOT_USED;
      device.user = null;
    }

    await this.logbookRepository.save(logbook);
    await this.deviceService.setDevice(device);

    return new LogbookDto(logbook);
  }

  async softDelete(logbookId: number) {
    const logbook = await this.logbookRepository.findOne({
      where: {
        id: logbookId,
      },
    });

    if (!logbook) {
      throw new LogbookNotFoundException('Logbook not found');
    }

    logbook.isDeleted = true;

    await this.logbookRepository.save(logbook);
  }

  async getByUserId(userId: number): Promise<LogbookDto | null> {
    const logbook = await this.logbookRepository.findLastLogbookByUserId(
      userId,
    );

    if (!logbook) {
      throw new LogbookNotFoundException('Logbook not found');
    }

    return new LogbookDto(logbook);
  }
}
