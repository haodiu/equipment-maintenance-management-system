import { Injectable, Res } from '@nestjs/common';
import { Response } from 'express';
import { Transactional } from 'typeorm-transactional';

import { DEVICE_STATUS } from '../../../constants/device-status';
import { DeviceNotFoundException } from '../../../exceptions/device-not-found.exception';
import { LiquidationNotFoundException } from '../../../exceptions/liquidation-not-found.exception';
import { DeviceService } from '../../device/services/device.service';
import { FileService } from '../../file/services/file.service';
import { UserEntity } from '../../user/domains/entities/user.entity';
import { LiquidationDto } from '../domains/dtos/liquidation.dto';
import { LiquidationDownloadDto } from '../domains/dtos/liquidation-download.dto';
import { LiquidationInputDto } from '../domains/dtos/liquidation-input.dto';
import type { LiquidationQueryDto } from '../domains/dtos/liquidation-query.dto';
import type { LiquidationUpdateDto } from '../domains/dtos/liquidation-update.dto';
import { LiquidationRepository } from '../repositories/liquidation.repository';

@Injectable()
export class LiquidationService {
  constructor(
    private readonly liquidationRepository: LiquidationRepository,
    private readonly deviceService: DeviceService,
    private readonly fileService: FileService,
  ) {}

  /**
   * Get detailed information about a liquidation by its ID.
   *
   * @param {number} liquidationId - The ID of the liquidation to get details for.
   * @returns {Promise<LiquidationDto | null>} A promise that resolves to detailed liquidation information,
   *                                          or null if no liquidation is found.
   * @throws {LiquidationNotFoundException} If the liquidation is not found.
   */
  async getDetail(liquidationId: number): Promise<LiquidationDto | null> {
    const liquidation = await this.liquidationRepository.findById(
      liquidationId,
    );

    if (!liquidation) {
      throw new LiquidationNotFoundException('Liquidation not found');
    }

    return new LiquidationDto(liquidation);
  }

  /**
   * Get a list of all liquidations, optionally filtered by approval status.
   *
   * @param {LiquidationQueryDto} [option] - Query options for filtering liquidations.
   * @returns {Promise<LiquidationDto[] | null>} A promise that resolves to an array of liquidation DTOs,
   *                                             or null if no liquidations are found.
   * @throws {LiquidationNotFoundException} If no liquidations are found.
   */
  async getAll(option?: LiquidationQueryDto): Promise<LiquidationDto[] | null> {
    const isApproved = option?.isApproved;

    const liquidations = await this.liquidationRepository.findAll(isApproved);

    if (!liquidations) {
      throw new LiquidationNotFoundException('Liquidation not found');
    }

    return liquidations.map((liquidation) => new LiquidationDto(liquidation));
  }

  /**
   * Create a new liquidation entry.
   *
   * @param {LiquidationInputDto} liquidationInputDto - Data for creating the new liquidation.
   * @param {UserEntity} authUser - The authenticated user performing the action.
   * @throws {Error} If there's an issue during the creation process or validation checks fail.
   */
  @Transactional()
  async createOne(
    liquidationInputDto: LiquidationInputDto,
    authUser: UserEntity,
  ) {
    const { reason, deviceId } = liquidationInputDto;
    const liquidationExistApproved =
      await this.liquidationRepository.checkDeviceLiquidate(deviceId);

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
    await this.deviceService.setDevice(device);
  }

  /**
   * Update an existing liquidation entry.
   *
   * @param {number} liquidationId - The ID of the liquidation to update.
   * @param {LiquidationUpdateDto} liquidationUpdateDto - Data for updating the liquidation.
   * @param {UserEntity} authUser - The authenticated user performing the action.
   * @returns {Promise<LiquidationDto>} A promise that resolves to a DTO containing the updated liquidation information.
   * @throws {LiquidationNotFoundException} If the liquidation is not found.
   */
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

  /**
   * Approve a liquidation entry.
   *
   * @param {number} liquidationId - The ID of the liquidation to approve.
   * @throws {LiquidationNotFoundException} If the liquidation is not found.
   */
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

  /**
   * Soft delete a liquidation entry.
   *
   * @param {number} liquidationId - The ID of the liquidation to soft delete.
   * @throws {LiquidationNotFoundException} If the liquidation is not found.
   */
  async softDelete(liquidationId: number) {
    const liquidation = await this.liquidationRepository.findById(
      liquidationId,
    );

    if (!liquidation) {
      throw new LiquidationNotFoundException('Liquidation not found');
    }

    liquidation.isDeleted = true;

    await this.liquidationRepository.save(liquidation);
  }

  /**
   * Get liquidation entries download information.
   *
   * @returns {Promise<LiquidationDownloadDto[]>} A promise that resolves to an array of DTOs containing liquidation download information.
   * @throws {LiquidationNotFoundException} If no liquidations are found.
   */
  async getLiquidationsDownloadInfo(): Promise<LiquidationDownloadDto[]> {
    const liquidations = await this.liquidationRepository.findAll();

    if (!liquidations) {
      throw new LiquidationNotFoundException('Liquidation not found');
    }

    return liquidations.map(
      (liquidation) => new LiquidationDownloadDto(liquidation),
    );
  }

  /**
   * Download liquidation entries information.
   *
   * @param {Response} res - Express Response object to send the download.
   */
  async downloadLiquidationInfo(@Res() res: Response) {
    const data: LiquidationDownloadDto[] =
      await this.getLiquidationsDownloadInfo();
    await this.fileService.downloadLiquidationInfoExcel(data, res);
  }
}
