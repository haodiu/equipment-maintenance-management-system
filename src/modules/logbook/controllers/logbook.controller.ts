import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

import { ForbiddenResponseDto } from '../../../common/dto/forbidden-response.dto';
import { SuccessMetaResponseDto } from '../../../common/dto/success-response.dto';
import { UnprocessableEntityResponseDto } from '../../../common/dto/unprocessable-entity.dto';
import { ROLE_TYPE } from '../../../constants';
import { Auth, AuthUser } from '../../../decorators';
import { UnauthorizedResponseDto } from '../../user/domains/dtos/unauthorized-response.dto';
import { UserEntity } from '../../user/domains/entities/user.entity';
import type { LogbookDto } from '../domains/dtos/logbook.dto';
import { LogbookConfirmDto } from '../domains/dtos/logbook-confirm.dto';
import { LogbookCreateDto } from '../domains/dtos/logbook-create.dto';
import { LogbookMetaResponseDto } from '../domains/dtos/logbook-meta-response.dto';
import { LogbookQueryDto } from '../domains/dtos/logbook-query.dto';
import { LogbookUpdateStatusDto } from '../domains/dtos/logbook-update-status.dto';
import { LogbooksMetaResponseDto } from '../domains/dtos/logbooks-meta-response.dto';
import { LogbookService } from '../services/logbook.service';

@Controller('logbooks')
@ApiTags('logbooks')
export class LogbookController {
  constructor(private readonly logbookService: LogbookService) {}

  @Post()
  @Auth([ROLE_TYPE.USER])
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Create Logbook Success',
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
  @ApiUnprocessableEntityResponse({
    description: 'Unprocessable Entity',
    type: UnprocessableEntityResponseDto,
  })
  createLogbook(
    @Body() logbookCreateDto: LogbookCreateDto,
  ): Promise<LogbookDto> {
    return this.logbookService.createLogbook(logbookCreateDto);
  }

  @Get()
  @Auth([ROLE_TYPE.MAINTENANCE_STAFF])
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Get Logbooks Success',
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
  getAllLogbooks(@Query() option?: LogbookQueryDto): Promise<LogbookDto[]> {
    return this.logbookService.getAll(option);
  }

  @Get(':id')
  @Auth([ROLE_TYPE.MAINTENANCE_STAFF, ROLE_TYPE.USER])
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Get A Logbook Success',
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
    description: 'Not Found',
    type: LogbookMetaResponseDto,
  })
  getOne(@Param('id') logbookId: number): Promise<LogbookDto | null> {
    return this.logbookService.getOne(logbookId);
  }

  @Put(':id/update-status')
  @Auth([ROLE_TYPE.MAINTENANCE_STAFF, ROLE_TYPE.USER])
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Update A Logbook Success',
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
  @ApiUnprocessableEntityResponse({
    description: 'Unprocessable Entity',
    type: UnprocessableEntityResponseDto,
  })
  updateLogBook(
    @Param('id') logbookId: number,
    @Body() logbookUpdateStatus: LogbookUpdateStatusDto,
  ): Promise<LogbookDto> {
    return this.logbookService.updateStatus(logbookId, logbookUpdateStatus);
  }

  @Put(':id/confirm')
  @Auth([ROLE_TYPE.USER])
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Confirm Success',
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
    type: UnprocessableEntityResponseDto,
  })
  confirmLogBook(
    @Param('id') logbookId: number,
    @Body() logbookConfirm: LogbookConfirmDto,
    @AuthUser() user: UserEntity,
  ) {
    return this.logbookService.confirmLogbookByUser(
      logbookId,
      logbookConfirm,
      user,
    );
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
  softDelete(@Param('id') logbookId: number) {
    return this.logbookService.softDelete(logbookId);
  }
}
