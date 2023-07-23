import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
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
}
