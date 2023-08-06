import { Injectable } from '@nestjs/common';

import { DEVICE_STATUS } from '../../../constants/device-status';
import { DeviceNotFoundException } from '../../../exceptions/device-not-found.exception';
import { LiquidationNotFoundException } from '../../../exceptions/liquidation-not-found.exception';
import { DeviceRepository } from '../../device/repositories/device.repository';
import { DeviceService } from '../../device/services/device.service';
import type { UserEntity } from '../../user/domains/entities/user.entity';
import { LiquidationDto } from '../domains/dtos/liquidation.dto';
import type { LiquidationInputDto } from '../domains/dtos/liquidation-input.dto';
import type { LiquidationQueryDto } from '../domains/dtos/liquidation-query.dto';
import type { LiquidationUpdateDto } from '../domains/dtos/liquidation-update.dto';
import { LiquidationRepository } from '../repositories/liquidation.repository';

@Injectable()
export class LiquidationService {
  constructor(
    private readonly liquidationRepository: LiquidationRepository,
    private readonly deviceService: DeviceService,
    private readonly deviceRepository: DeviceRepository,
  ) {}

  async getDetail(liquidationId: number): Promise<LiquidationDto | null> {
    const liquidation = await this.liquidationRepository.findById(
      liquidationId,
    );

    if (!liquidation) {
      throw new LiquidationNotFoundException('Liquidation not found');
    }

    return new LiquidationDto(liquidation);
  }

  async getAll(option?: LiquidationQueryDto): Promise<LiquidationDto[] | null> {
    const isApproved = option?.isApproved;

    const liquidations = await this.liquidationRepository.findAll(isApproved);

    if (!liquidations) {
      throw new LiquidationNotFoundException('Liquidation not found');
    }

    return liquidations.map((liquidation) => new LiquidationDto(liquidation));
  }

  async createOne(
    liquidationInputDto: LiquidationInputDto,
    authUser: UserEntity,
  ) {
    const { reason, deviceId } = liquidationInputDto;
    const liquidationExistApproved =
      await this.liquidationRepository.checkIsApprovedByDeviceId(deviceId);

    if (liquidationExistApproved) {
      throw new Error('Device was liquidate');
    }

    const device = await this.deviceService.findById(deviceId);

    if (!device) {
      throw new DeviceNotFoundException('Device not found');
    }

    if (device.deviceStatus !== DEVICE_STATUS.NOT_USED) {
      throw new Error('Device in use by user');
    }

    const liquidation = this.liquidationRepository.create({
      reason,
      auth: authUser,
      device,
    });

    device.deviceStatus = DEVICE_STATUS.PENDING_DISPOSAL;

    await this.liquidationRepository.save(liquidation);
    await this.deviceRepository.save(device);
  }

  async updateOne(
    liquidationId: number,
    liquidationUpdateDto: LiquidationUpdateDto,
    authUser: UserEntity,
  ): Promise<LiquidationDto> {
    const reason = liquidationUpdateDto.reason;
    const liquidation = await this.liquidationRepository.findById(
      liquidationId,
    );

    if (!liquidation) {
      throw new LiquidationNotFoundException('Liquidation not found');
    }

    liquidation.reason = reason;
    liquidation.auth = authUser;

    await this.liquidationRepository.save(liquidation);

    return new LiquidationDto(liquidation);
  }

  async approveLiquidation(liquidationId: number) {
    const liquidation = await this.liquidationRepository.findById(
      liquidationId,
    );

    if (!liquidation) {
      throw new LiquidationNotFoundException('Liquidation not found');
    }

    liquidation.approved = true;

    await this.liquidationRepository.save(liquidation);
  }

  async softDeleted(liquidationId: number) {
    const liquidation = await this.liquidationRepository.findById(
      liquidationId,
    );

    if (!liquidation) {
      throw new LiquidationNotFoundException('Liquidation not found');
    }

    liquidation.isDeleted = true;

    await this.liquidationRepository.save(liquidation);
  }
}
