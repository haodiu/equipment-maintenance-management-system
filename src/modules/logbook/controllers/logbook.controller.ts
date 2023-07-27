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
import { ApiQuery, ApiTags } from '@nestjs/swagger';

import type { LogbookDto } from '../domains/dtos/logbook.dto';
import { LogbookCreateDto } from '../domains/dtos/logbook-create.dto';
import { LogbookQueryDto } from '../domains/dtos/logbook-query.dto';
import { LogbookUpdateDto } from '../domains/dtos/logbook-update.dto';
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
  @ApiQuery({ type: 'type', required: false })
  @HttpCode(HttpStatus.OK)
  getAllLogbooks(@Query() option?: LogbookQueryDto): Promise<LogbookDto[]> {
    return this.logbookService.getAll(option);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getOne(@Param('id') logbookId: number): Promise<LogbookDto> {
    return this.logbookService.getOne(logbookId);
  }

  @Put(':id/update')
  @HttpCode(HttpStatus.OK)
  updateLogBook(
    @Param('id') logbookId: number,
    @Body() logbookUpdate: LogbookUpdateDto,
  ): Promise<LogbookDto> {
    return this.logbookService.updateLogbook(logbookId, logbookUpdate);
  }

  @Post(':id/soft-delete')
  @HttpCode(HttpStatus.OK)
  softDelete(@Param('id') logbookId: number) {
    return this.logbookService.softDelete(logbookId);
  }
}
