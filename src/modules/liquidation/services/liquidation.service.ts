import { Injectable } from '@nestjs/common';

import { DeviceNotFoundException } from '../../../exceptions/device-not-found.exception';
import { LiquidationNotFoundException } from '../../../exceptions/liquidation-not-found.exception';
import { DeviceService } from '../../device/services/device.service';
import type { UserEntity } from '../../user/domains/entities/user.entity';
import { LiquidationDto } from '../domains/dtos/liquidation.dto';
import type { LiquidationInputDto } from '../domains/dtos/liquidation-input.dto';
import type { LiquidationQueryDto } from '../domains/dtos/liquidation-query.dto';
import { LiquidationRepository } from '../repositories/liquidation.repository';

@Injectable()
export class LiquidationService {
  constructor(
    private readonly liquidationRepository: LiquidationRepository,
    private readonly deviceService: DeviceService,
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

    const liquidation = this.liquidationRepository.create({
      reason,
      auth: authUser,
      device,
    });

    await this.liquidationRepository.save(liquidation);
  }

  async updateOne(
    liquidationId: number,
    liquidationInputDto: LiquidationInputDto,
    authUser: UserEntity,
  ): Promise<LiquidationDto> {
    const reason = liquidationInputDto.reason;
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
