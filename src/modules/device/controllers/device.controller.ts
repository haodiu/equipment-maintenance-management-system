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

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getDevice(@Param('id') deviceId: number): Promise<DeviceResponseDto> {
    return this.deviceService.getDetail(deviceId);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  updateDevice(
    @Param('id') deviceId: number,
    @Body() inputDeviceDto: InputDeviceDto,
  ): Promise<DeviceResponseDto> {
    return this.deviceService.updateDevice(deviceId, inputDeviceDto);
  }
}
