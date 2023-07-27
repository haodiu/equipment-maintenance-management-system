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

import { ROLE_TYPE } from '../../../constants';
import { Auth, AuthUser } from '../../../decorators';
import { UserEntity } from '../../user/domains/entities/user.entity';
import type { LiquidationDto } from '../domains/dtos/liquidation.dto';
import { LiquidationInputDto } from '../domains/dtos/liquidation-input.dto';
import { LiquidationQueryDto } from '../domains/dtos/liquidation-query.dto';
import { LiquidationService } from '../services/liquidation.service';

@Controller('liquidations')
@ApiTags('liquidations')
export class LiquidationController {
  constructor(private readonly liquidationService: LiquidationService) {}

  @Get()
  @ApiQuery({ name: 'approved', required: false })
  @HttpCode(HttpStatus.OK)
  getLiquidations(
    @Query() option: LiquidationQueryDto,
  ): Promise<LiquidationDto[] | null> {
    return this.liquidationService.getAll(option);
  }

  @Post()
  @Auth([ROLE_TYPE.ADMIN, ROLE_TYPE.MAINTENANCE_STAFF])
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
  @Auth([ROLE_TYPE.ADMIN, ROLE_TYPE.MAINTENANCE_STAFF])
  @HttpCode(HttpStatus.OK)
  updateLiquidation(
    @Param('id') id: number,
    @Body() liquidationInputDto: LiquidationInputDto,
    @AuthUser() user: UserEntity,
  ) {
    return this.liquidationService.updateOne(id, liquidationInputDto, user);
  }

  @Post(':id/soft-delete')
  @HttpCode(HttpStatus.OK)
  softDelete(@Param('id') id: number) {
    return this.liquidationService.softDeleted(id);
  }
}