import { Injectable } from '@nestjs/common';

import { LOGBOOK_STATUS } from '../../../constants/logbook-status';
import { UserNotFoundException } from '../../../exceptions';
import { DeviceNotFoundException } from '../../../exceptions/device-not-found.exception';
import { DeviceTypeNotFoundException } from '../../../exceptions/device-type-not-found.exception';
import { LogbookNotFoundException } from '../../../exceptions/logbook-not-found.exception';
import { DeviceService } from '../../device/services/device.service';
import { UserService } from '../../user/services/user.service';
import { LogbookDto } from '../domains/dtos/logbook.dto';
import type { LogbookCreateDto } from '../domains/dtos/logbook-create.dto';
import { LogbookInfoDto } from '../domains/dtos/logbook-info.dto';
import type { LogbookQueryDto } from '../domains/dtos/logbook-query.dto';
import type { LogbookUpdateDto } from '../domains/dtos/logbook-update.dto';
import { LogbookEntity } from '../domains/entities/logbook.entity';
import { LogbookRepository } from '../repositories/logbook.repository';
import { LogbookTypeRepository } from '../repositories/logbook-type.repository';

@Injectable()
export class LogbookService {
  constructor(
    private readonly logbookRepository: LogbookRepository,
    private readonly userService: UserService,
    private readonly logbookTypeRepository: LogbookTypeRepository,
    private readonly deviceService: DeviceService,
  ) {}

  async findByDeviceId(deviceId: number): Promise<LogbookInfoDto[]> {
    const logbooks = await this.logbookRepository.findByDeviceId(deviceId);

    return logbooks.map((logbook) => new LogbookInfoDto(logbook));
  }

  async createLogbook(logbookCreateDto: LogbookCreateDto): Promise<LogbookDto> {
    const { userId, deviceId, typeId } = logbookCreateDto;
    const user = await this.userService.findOneById(userId);

    if (!user) {
      throw new UserNotFoundException('User not found');
    }

    const logbookType = await this.logbookTypeRepository.findById(typeId);

    if (!logbookType) {
      throw new DeviceTypeNotFoundException('DeviceType not found');
    }

    const device = await this.deviceService.findById(deviceId);

    if (!device) {
      throw new DeviceNotFoundException('Device not found');
    }

    const logbook = new LogbookEntity();
    logbook.status = LOGBOOK_STATUS.PENDING;
    logbook.user = user;
    logbook.type = logbookType;
    logbook.device = device;

    await this.logbookRepository.save(logbook);

    return new LogbookDto(logbook);
  }

  async getAll(option?: LogbookQueryDto): Promise<LogbookDto[]> {
    const type = option?.type;
    const logbooks = await this.logbookRepository.findAll(type);

    return logbooks.map((logbook) => new LogbookDto(logbook));
  }

  async getOne(logbookId: number): Promise<LogbookDto> {
    const logbook = await this.logbookRepository.findOneById(logbookId);

    if (!logbook) {
      throw new LogbookNotFoundException('Logbook not found');
    }

    return new LogbookDto(logbook);
  }

  async updateLogbook(
    logbookId: number,
    logbookUpdateDto: LogbookUpdateDto,
  ): Promise<LogbookDto> {
    const logbook = await this.logbookRepository.findOneById(logbookId);

    if (!logbook) {
      throw new LogbookNotFoundException('Logbook not found');
    }

    const { status, confirm } = logbookUpdateDto;

    if (status) {
      logbook.status = status;
    }

    if (confirm) {
      logbook.confirmed = confirm.confirmed;
      logbook.confirmedDescription = confirm.confirmedDescription;
    }

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
}
