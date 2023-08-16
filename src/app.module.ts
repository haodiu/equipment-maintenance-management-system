import './boilerplate.polyfill';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import {
  addTransactionalDataSource,
  getDataSourceByName,
} from 'typeorm-transactional';

import { AuthModule } from './modules/auth/auth.module';
import { DeviceModule } from './modules/device/device.module';
import { FileModule } from './modules/file/file.module';
import { HealthCheckerModule } from './modules/health/health.module';
import { LiquidationModule } from './modules/liquidation/liquidation.module';
import { LogbookModule } from './modules/logbook/logbook.module';
import { UserModule } from './modules/user/user.module';
import { ApiConfigService } from './shared/services/api-config.service';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [SharedModule],
      useFactory: (configService: ApiConfigService) =>
        configService.postgresConfig,
      inject: [ApiConfigService],
      dataSourceFactory: (options) => {
        if (!options) {
          throw new Error('Invalid options passed');
        }

        const newDataSource = addTransactionalDataSource(
          new DataSource(options),
        );

        const existedDataSource = getDataSourceByName(options.name || '');

        const dataSource = existedDataSource || newDataSource;

        return Promise.resolve(dataSource);
      },
    }),
    HealthCheckerModule,
    AuthModule,
    UserModule,
    LogbookModule,
    DeviceModule,
    LiquidationModule,
    FileModule,
  ],
  providers: [],
})
export class AppModule {}
