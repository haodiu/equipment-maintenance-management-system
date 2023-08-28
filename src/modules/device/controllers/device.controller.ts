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
import {
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { Response } from 'express';

import { ForbiddenResponseDto } from '../../../common/dto/forbidden-response.dto';
import { SuccessMetaResponseDto } from '../../../common/dto/success-response.dto';
import { UnprocessableEntityResponseDto } from '../../../common/dto/unprocessable-entity.dto';
import { ROLE_TYPE } from '../../../constants';
import { Auth } from '../../../decorators';
import type { LogbookDto } from '../../logbook/domains/dtos/logbook.dto';
import { LogbookMetaResponseDto } from '../../logbook/domains/dtos/logbook-meta-response.dto';
import { LogbookNotFoundResponseDto } from '../../logbook/domains/dtos/logbook-not-found.response.dto';
import { LogbooksMetaResponseDto } from '../../logbook/domains/dtos/logbooks-meta-response.dto';
import { LogbookService } from '../../logbook/services/logbook.service';
import { UnauthorizedResponseDto } from '../../user/domains/dtos/unauthorized-response.dto';
import { DeviceMetaResponseDto } from '../domains/dtos/device-meta-response.dto';
import { DeviceNotFoundResponseDto } from '../domains/dtos/device-not-found-response.dto';
import type { DeviceResponseDto } from '../domains/dtos/device-response.dto';
import { DevicesMetaResponseDto } from '../domains/dtos/devices-meta-response.dto';
import { InputDeviceDto } from '../domains/dtos/input-device.dto';
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
  @ApiOkResponse({
    description: 'Create Device Success',
    type: DeviceMetaResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    type: UnauthorizedResponseDto,
  })
  @ApiForbiddenResponse({
    description: 'No Access Permission',
    type: ForbiddenResponseDto,
  })
  @ApiUnprocessableEntityResponse({
    description: 'Unprocessable Entity',
    type: UnprocessableEntityResponseDto,
  })
  createDevice(
    @Body() inputDeviceDto: InputDeviceDto,
  ): Promise<DeviceResponseDto> {
    return this.deviceService.createDevice(inputDeviceDto);
  }

  @Get()
  @Auth([ROLE_TYPE.MAINTENANCE_STAFF, ROLE_TYPE.USER])
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Get Devices Success',
    type: DevicesMetaResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    type: UnauthorizedResponseDto,
  })
  @ApiForbiddenResponse({
    description: 'No Access Permission',
    type: ForbiddenResponseDto,
  })
  getAllDevice(): Promise<DeviceResponseDto[]> {
    return this.deviceService.getAll();
  }

  @Get('download-devices')
  @Auth([ROLE_TYPE.MAINTENANCE_STAFF])
  @HttpCode(HttpStatus.OK)
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    type: UnauthorizedResponseDto,
  })
  @ApiForbiddenResponse({
    description: 'No Access Permission',
    type: ForbiddenResponseDto,
  })
  downloadDevicesInfo(@Res() res: Response) {
    return this.deviceService.downloadDevicesInfo(res);
  }

  @Get(':id')
  @Auth([ROLE_TYPE.MAINTENANCE_STAFF])
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Get Devices Success',
    type: DeviceMetaResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    type: UnauthorizedResponseDto,
  })
  @ApiForbiddenResponse({
    description: 'No Access Permission',
    type: ForbiddenResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Not found',
    type: DeviceNotFoundResponseDto,
  })
  getDevice(@Param('id') deviceId: number): Promise<DeviceResponseDto> {
    return this.deviceService.getDetail(deviceId);
  }

  @Get(':id/logbook')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Get Last Logbook Success',
    type: LogbookMetaResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    type: UnauthorizedResponseDto,
  })
  @ApiForbiddenResponse({
    description: 'No Access Permission',
    type: ForbiddenResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Not found',
    type: LogbookNotFoundResponseDto,
  })
  getLastLogbook(@Param('id') deviceId: number): Promise<LogbookDto | null> {
    return this.logbookService.findLastOneByDeviceId(deviceId);
  }

  @Get(':id/logbooks')
  @Auth([ROLE_TYPE.MAINTENANCE_STAFF, ROLE_TYPE.USER])
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Get Logbooks Of The Device Success',
    type: LogbooksMetaResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    type: UnauthorizedResponseDto,
  })
  @ApiForbiddenResponse({
    description: 'No Access Permission',
    type: ForbiddenResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Not found',
    type: LogbookNotFoundResponseDto,
  })
  getLogbooks(@Param('id') deviceId: number): Promise<LogbookDto[]> {
    return this.logbookService.findAllByDeviceId(deviceId);
  }

  @Put(':id/update')
  @Auth([ROLE_TYPE.MAINTENANCE_STAFF])
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Update Device Success',
    type: DeviceMetaResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    type: UnauthorizedResponseDto,
  })
  @ApiForbiddenResponse({
    description: 'No Access Permission',
    type: ForbiddenResponseDto,
  })
  @ApiUnprocessableEntityResponse({
    description: 'Unprocessable Entity',
    type: UnprocessableEntityResponseDto,
  })
  updateDevice(
    @Param('id') deviceId: number,
    @Body() inputDeviceDto: InputDeviceDto,
  ): Promise<DeviceResponseDto> {
    return this.deviceService.updateDevice(deviceId, inputDeviceDto);
  }

  @Post(':id/soft-delete')
  @Auth([ROLE_TYPE.MAINTENANCE_STAFF])
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Deleted',
    type: SuccessMetaResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    type: UnauthorizedResponseDto,
  })
  @ApiForbiddenResponse({
    description: 'No Access Permission',
    type: ForbiddenResponseDto,
  })
  deleteDevice(@Param('id') deviceId: number) {
    return this.deviceService.softDelete(deviceId);
  }

  @Get(':id/download-logbooks')
  @Auth([ROLE_TYPE.MAINTENANCE_STAFF])
  @HttpCode(HttpStatus.OK)
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    type: UnauthorizedResponseDto,
  })
  @ApiForbiddenResponse({
    description: 'No Access Permission',
    type: ForbiddenResponseDto,
  })
  @ApiParam({ name: 'id', description: 'Device ID' })
  downloadUserInfo(@Param('id') liquidationId: number, @Res() res: Response) {
    return this.deviceService.downloadLogbooksInfo(liquidationId, res);
  }
}
