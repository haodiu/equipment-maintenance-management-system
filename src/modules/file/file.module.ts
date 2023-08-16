import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { ImageService } from '../../shared/services/image.service';
import { SharedModule } from '../../shared/shared.module';
import { FileService } from './services/file.service';

@Module({
  imports: [HttpModule, SharedModule],
  providers: [ImageService, FileService],
  exports: [FileService],
})
export class FileModule {}
