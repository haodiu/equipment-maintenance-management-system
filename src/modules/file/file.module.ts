import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { ImageService } from '../../shared/services/image.service';
import { SharedModule } from '../../shared/shared.module';
import { FileController } from './controllers/file.controller';
import { FileService } from './services/file.service';

@Module({
  imports: [HttpModule, SharedModule],
  controllers: [FileController],
  providers: [ImageService, FileService],
  exports: [FileService],
})
export class FileModule {}
