import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ROLE_TYPE } from '../../../constants';
import { Auth } from '../../../decorators';
import type { DeviceLogbookDto } from '../domains/dtos/device-logbook.dto';
import type { DeviceResponseDto } from '../domains/dtos/device-response.dto';
import { InputDeviceDto } from '../domains/dtos/input-device.dto';
import { DeviceService } from '../services/device.service';

@Controller('devices')
@ApiTags('devices')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  createDevice(
    @Body() inputDeviceDto: InputDeviceDto,
  ): Promise<DeviceResponseDto> {
    return this.deviceService.createDevice(inputDeviceDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  getAllDevice(): Promise<DeviceResponseDto[]> {
    return this.deviceService.getAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getDevice(@Param('id') deviceId: number): Promise<DeviceResponseDto> {
    return this.deviceService.getDetail(deviceId);
  }

  @Get(':id/logbook')
  @HttpCode(HttpStatus.OK)
  getDeviceHistory(@Param('id') deviceId: number): Promise<DeviceLogbookDto> {
    return this.deviceService.getDeviceHistory(deviceId);
  }

  @Put(':id/update')
  @HttpCode(HttpStatus.OK)
  updateDevice(
    @Param('id') deviceId: number,
    @Body() inputDeviceDto: InputDeviceDto,
  ): Promise<DeviceResponseDto> {
    return this.deviceService.updateDevice(deviceId, inputDeviceDto);
  }

  @Post(':id/soft-delete')
  @Auth([ROLE_TYPE.ADMIN, ROLE_TYPE.MAINTENANCE_STAFF])
  @HttpCode(HttpStatus.OK)
  deleteDevice(@Param('id') deviceId: number) {
    return this.deviceService.softDelete(deviceId);
  }
}
