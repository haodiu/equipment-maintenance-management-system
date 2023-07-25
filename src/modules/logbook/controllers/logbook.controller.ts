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

import type { LogbookDto } from '../domains/dtos/logbook.dto';
import { LogbookCreateDto } from '../domains/dtos/logbook-create.dto';
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
  @HttpCode(HttpStatus.OK)
  getAllLogbooks(): Promise<LogbookDto[]> {
    return this.logbookService.getAll();
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
