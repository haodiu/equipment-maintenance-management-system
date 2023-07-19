import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';

import { HealthCheckerController } from './health.controller';

@Module({
  imports: [TerminusModule],
  controllers: [HealthCheckerController],
  providers: [],
})
export class HealthCheckerModule {}
