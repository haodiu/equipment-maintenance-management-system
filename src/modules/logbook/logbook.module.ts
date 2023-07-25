import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DeviceModule } from '../device/device.module';
import { UserModule } from '../user/user.module';
import { LogbookController } from './controllers/logbook.controller';
import { LogbookEntity } from './domains/entities/logbook.entity';
import { LogbookTypeEntity } from './domains/entities/logbook-type.entity';
import { LogbookRepository } from './repositories/logbook.repository';
import { LogbookTypeRepository } from './repositories/logbook-type.repository';
import { LogbookService } from './services/logbook.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([LogbookEntity, LogbookTypeEntity]),
    UserModule,
    forwardRef(() => DeviceModule),
  ],
  controllers: [LogbookController],
  exports: [LogbookService],
  providers: [LogbookService, LogbookRepository, LogbookTypeRepository],
})
export class LogbookModule {}
