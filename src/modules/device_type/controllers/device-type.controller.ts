import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UnprocessableEntityException,
} from '@nestjs/common';
import {
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

import { ForbiddenResponseDto } from '../../../common/dto/forbidden-response.dto';
import { SuccessMetaResponseDto } from '../../../common/dto/success-response.dto';
import { UnauthorizedResponseDto } from '../../../common/dto/unauthorized-response.dto';
import { ROLE_TYPE } from '../../../constants';
import { Auth } from '../../../decorators';
import type { DeviceTypeDto } from '../domains/dtos/device-type.dto';
import { DeviceTypesMetaResponseDto } from '../domains/dtos/device-types-meta-response.dto';
import { InputDeviceTypeDto } from '../domains/dtos/input-device-type.dto';
import type { NumDeviceTypeDto } from '../domains/dtos/num-device-type.dto';
import { NumDeviceTypeMetaResponseDto } from '../domains/dtos/num-device-type-meta-response.dto';
import { DeviceTypeService } from '../services/device-type.service';

@Controller('device-types')
@ApiTags('device-types')
export class DeviceTypeController {
  constructor(private readonly deviceTypeService: DeviceTypeService) {}

  @Post()
  @Auth([ROLE_TYPE.MAINTENANCE_STAFF])
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Create Device Type Success',
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
  @ApiUnprocessableEntityResponse({
    description: 'Unprocessable Entity',
    type: UnprocessableEntityException,
  })
  createDeviceType(@Body() inputDeviceType: InputDeviceTypeDto) {
    return this.deviceTypeService.createDeviceType(inputDeviceType);
  }

  @Get()
  @Auth([ROLE_TYPE.MAINTENANCE_STAFF, ROLE_TYPE.USER])
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Get Types Success',
    type: DeviceTypesMetaResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    type: UnauthorizedResponseDto,
  })
  @ApiForbiddenResponse({
    description: 'No Access Permission',
    type: ForbiddenResponseDto,
  })
  getDeviceTypes(): Promise<DeviceTypeDto[]> {
    return this.deviceTypeService.getAllDeviceType();
  }

  @Get('statistics')
  @Auth([ROLE_TYPE.MAINTENANCE_STAFF])
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Get Statistics Success',
    type: NumDeviceTypeMetaResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    type: UnauthorizedResponseDto,
  })
  @ApiForbiddenResponse({
    description: 'No Access Permission',
    type: ForbiddenResponseDto,
  })
  getDeviceTypeAmount(): Promise<NumDeviceTypeDto[]> {
    return this.deviceTypeService.getDeviceTypeCounts();
  }
}
