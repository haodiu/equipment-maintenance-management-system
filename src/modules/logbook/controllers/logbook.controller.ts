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
import { ApiTags } from '@nestjs/swagger';

import { ROLE_TYPE } from '../../../constants';
import { Auth, AuthUser } from '../../../decorators';
import { UserEntity } from '../../user/domains/entities/user.entity';
import type { LogbookDto } from '../domains/dtos/logbook.dto';
import { LogbookConfirmDto } from '../domains/dtos/logbook-confirm.dto';
import { LogbookCreateDto } from '../domains/dtos/logbook-create.dto';
import { LogbookQueryDto } from '../domains/dtos/logbook-query.dto';
import { LogbookUpdateStatusDto } from '../domains/dtos/logbook-update-status.dto';
import { LogbookService } from '../services/logbook.service';

@Controller('logbooks')
@ApiTags('logbooks')
export class LogbookController {
  constructor(private readonly logbookService: LogbookService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  createLogbook(
    @Body() logbookCreateDto: LogbookCreateDto,
  ): Promise<LogbookDto> {
    return this.logbookService.createLogbook(logbookCreateDto);
  }

  @Get()
  @Auth([ROLE_TYPE.MAINTENANCE_STAFF])
  @HttpCode(HttpStatus.OK)
  getAllLogbooks(@Query() option?: LogbookQueryDto): Promise<LogbookDto[]> {
    return this.logbookService.getAll(option);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getOne(@Param('id') logbookId: number): Promise<LogbookDto> {
    return this.logbookService.getOne(logbookId);
  }

  @Put(':id/update-status')
  @HttpCode(HttpStatus.OK)
  updateLogBook(
    @Param('id') logbookId: number,
    @Body() logbookUpdateStatus: LogbookUpdateStatusDto,
  ): Promise<LogbookDto> {
    return this.logbookService.updateStatus(logbookId, logbookUpdateStatus);
  }

  @Put(':id/confirm')
  @Auth([ROLE_TYPE.USER])
  @HttpCode(HttpStatus.OK)
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
  @HttpCode(HttpStatus.OK)
  softDelete(@Param('id') logbookId: number) {
    return this.logbookService.softDelete(logbookId);
  }
}
