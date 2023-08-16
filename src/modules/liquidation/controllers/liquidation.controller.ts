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
  Res,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { ROLE_TYPE } from '../../../constants';
import { Auth, AuthUser } from '../../../decorators';
import { UserEntity } from '../../user/domains/entities/user.entity';
import type { LiquidationDto } from '../domains/dtos/liquidation.dto';
import { LiquidationInputDto } from '../domains/dtos/liquidation-input.dto';
import { LiquidationQueryDto } from '../domains/dtos/liquidation-query.dto';
import { LiquidationUpdateDto } from '../domains/dtos/liquidation-update.dto';
import { LiquidationService } from '../services/liquidation.service';

@Controller('liquidations')
@ApiTags('liquidations')
export class LiquidationController {
  constructor(private readonly liquidationService: LiquidationService) {}

  @Get()
  @Auth([ROLE_TYPE.MAINTENANCE_STAFF])
  @HttpCode(HttpStatus.OK)
  getLiquidations(
    @Query() option: LiquidationQueryDto,
  ): Promise<LiquidationDto[] | null> {
    return this.liquidationService.getAll(option);
  }

  @Get('/download-info')
  @Auth([ROLE_TYPE.MAINTENANCE_STAFF])
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Download user information successfully' })
  downloadUserInfo(@Res() res: Response) {
    return this.liquidationService.downloadLiquidationInfo(res);
  }

  @Post()
  @Auth([ROLE_TYPE.MAINTENANCE_STAFF])
  @HttpCode(HttpStatus.OK)
  createLiquidation(
    @Body() liquidationInputDto: LiquidationInputDto,
    @AuthUser() user: UserEntity,
  ) {
    return this.liquidationService.createOne(liquidationInputDto, user);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getLiquidation(@Param('id') id: number): Promise<LiquidationDto | null> {
    return this.liquidationService.getDetail(id);
  }

  @Put(':id/update')
  @Auth([ROLE_TYPE.MAINTENANCE_STAFF])
  @HttpCode(HttpStatus.OK)
  updateLiquidation(
    @Param('id') id: number,
    @Body() liquidationUpdateDto: LiquidationUpdateDto,
    @AuthUser() user: UserEntity,
  ) {
    return this.liquidationService.updateOne(id, liquidationUpdateDto, user);
  }

  @Post(':id/soft-delete')
  @HttpCode(HttpStatus.OK)
  softDelete(@Param('id') id: number) {
    return this.liquidationService.softDeleted(id);
  }
}
