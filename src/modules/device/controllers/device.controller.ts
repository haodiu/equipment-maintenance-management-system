import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { ROLE_TYPE } from '../../../constants';
import { Auth } from '../../../decorators';
import type { LogbookDto } from '../../logbook/domains/dtos/logbook.dto';
import { LogbookService } from '../../logbook/services/logbook.service';
import type { DeviceResponseDto } from '../domains/dtos/device-response.dto';
import type { DeviceTypeDto } from '../domains/dtos/device-type.dto';
import { InputDeviceDto } from '../domains/dtos/input-device.dto';
import { InputDeviceTypeDto } from '../domains/dtos/input-device-type.dto';
import type { NumDeviceByTypeDto } from '../domains/dtos/num-device-by-type.dto';
import { DeviceService } from '../services/device.service';

@Controller('devices')
@ApiTags('devices')
export class DeviceController {
  constructor(
    private readonly deviceService: DeviceService,
    private readonly logbookService: LogbookService,
  ) {}

  @Post()
  @Auth([ROLE_TYPE.MAINTENANCE_STAFF])
  @HttpCode(HttpStatus.OK)
  createDevice(
    @Body() inputDeviceDto: InputDeviceDto,
  ): Promise<DeviceResponseDto> {
    return this.deviceService.createDevice(inputDeviceDto);
  }

  @Post('device-type')
  @Auth([ROLE_TYPE.MAINTENANCE_STAFF])
  @HttpCode(HttpStatus.OK)
  createDeviceType(@Body() inputDeviceType: InputDeviceTypeDto) {
    return this.deviceService.createDeviceType(inputDeviceType);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @Auth([ROLE_TYPE.MAINTENANCE_STAFF, ROLE_TYPE.USER])
  getAllDevice(): Promise<DeviceResponseDto[]> {
    return this.deviceService.getAll();
  }

  @Get('types')
  @Auth([ROLE_TYPE.MAINTENANCE_STAFF, ROLE_TYPE.USER])
  @HttpCode(HttpStatus.OK)
  getDeviceTypes(): Promise<DeviceTypeDto[]> {
    return this.deviceService.getAllDeviceType();
  }

  @Get('device-type-count')
  @Auth([ROLE_TYPE.MAINTENANCE_STAFF])
  @HttpCode(HttpStatus.OK)
  getDeviceTypeAmount(): Promise<NumDeviceByTypeDto[]> {
    return this.deviceService.getDeviceTypeCounts();
  }

  @Get('download-devices')
  @Auth([ROLE_TYPE.MAINTENANCE_STAFF])
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Download device successfully' })
  downloadDevicesInfo(@Res() res: Response) {
    return this.deviceService.downloadDevicesInfo(res);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getDevice(@Param('id') deviceId: number): Promise<DeviceResponseDto> {
    return this.deviceService.getDetail(deviceId);
  }

  @Get(':id/logbook')
  @HttpCode(HttpStatus.OK)
  getLastLogbook(@Param('id') deviceId: number): Promise<LogbookDto | null> {
    return this.logbookService.findLastOneByDeviceId(deviceId);
  }

  @Get(':id/logbooks')
  @HttpCode(HttpStatus.OK)
  getLogbooks(@Param('id') deviceId: number): Promise<LogbookDto[] | null> {
    return this.logbookService.findAllByDeviceId(deviceId);
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

  @Get(':id/download-logbooks')
  @Auth([ROLE_TYPE.MAINTENANCE_STAFF])
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'id', description: 'Device ID' })
  @ApiOkResponse({ description: 'Download device logbooks successfully' })
  downloadUserInfo(@Param('id') liquidationId: number, @Res() res: Response) {
    return this.deviceService.downloadLogbooksInfo(liquidationId, res);
  }
}
