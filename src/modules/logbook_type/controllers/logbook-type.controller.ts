import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import {
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { ForbiddenResponseDto } from '../../../common/dto/forbidden-response.dto';
import { ROLE_TYPE } from '../../../constants';
import { Auth } from '../../../decorators';
import { UnauthorizedResponseDto } from '../../user/domains/dtos/unauthorized-response.dto';
import type { LogbookTypeDto } from '../domains/dtos/logbook-type.dto';
import { LogbookTypeMetaResponseDto } from '../domains/dtos/logbook-type-meta-response.dto';
import type { NumLogbookByTypeDto } from '../domains/dtos/num-logbook-type.dto';
import { NumLogbookTypeMetaResponseDto } from '../domains/dtos/num-logbook-type-meta-response.dto';
import { LogbookTypeService } from '../services/logbook-type.service';

@Controller('logbook-types')
@ApiTags('logbook-types')
export class LogbookTypeController {
  constructor(private readonly logbookTypeService: LogbookTypeService) {}

  @Get()
  @Auth([ROLE_TYPE.MAINTENANCE_STAFF, ROLE_TYPE.USER])
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Get Logbooks By Type Success',
    type: LogbookTypeMetaResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    type: UnauthorizedResponseDto,
  })
  @ApiForbiddenResponse({
    description: 'No Access Permission',
    type: ForbiddenResponseDto,
  })
  getLogbookTypes(): Promise<LogbookTypeDto[]> {
    return this.logbookTypeService.getLogbookTypes();
  }

  @Get('statistics')
  @Auth([ROLE_TYPE.MAINTENANCE_STAFF])
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Get Logbooks By Type Success',
    type: NumLogbookTypeMetaResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    type: UnauthorizedResponseDto,
  })
  @ApiForbiddenResponse({
    description: 'No Access Permission',
    type: ForbiddenResponseDto,
  })
  getDeviceTypeAmount(): Promise<NumLogbookByTypeDto[]> {
    return this.logbookTypeService.getLogbookTypeCounts();
  }
}
