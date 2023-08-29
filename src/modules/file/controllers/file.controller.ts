import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UploadedFile,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiPayloadTooLargeResponse,
  ApiServiceUnavailableResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { SuccessMetaResponseDto } from '../../../common/dto/success-response.dto';
import { ROLE_TYPE } from '../../../constants';
import { ApiFile, Auth } from '../../../decorators';
import { IFile } from '../../../interfaces';
import { ImageService } from '../../../shared/services/image.service';
import { FileNotFoundResponseDto } from '../domains/dtos/file-not-found-response.dto';
import { FileNotHandleResponseDto } from '../domains/dtos/file-not-handle-response.dto';
import { FileNotImageResponseDto } from '../domains/dtos/file-not-image-response.dto';
import { FileSizeLimitResponseDto } from '../domains/dtos/file-size-limit-response.dto';
import { FileURLOkResponse } from '../domains/dtos/file-url-ok-response.dto';

@Controller('files')
@ApiTags('files')
export class FileController {
  constructor(private imageService: ImageService) {}

  @Post('images')
  @Auth([ROLE_TYPE.MAINTENANCE_STAFF, ROLE_TYPE.USER])
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: SuccessMetaResponseDto,
    description: 'Upload image successfully',
  })
  @ApiPayloadTooLargeResponse({
    type: FileSizeLimitResponseDto,
    description: 'File size limit',
  })
  @ApiServiceUnavailableResponse({
    type: FileNotHandleResponseDto,
    description: 'Failed upload image',
  })
  @ApiFile([{ name: 'file', isArray: false }], { isRequired: true })
  uploadImage(@UploadedFile() file: IFile): Promise<string | undefined> {
    return this.imageService.uploadImage(file);
  }

  @Get('images/:id')
  @Auth([ROLE_TYPE.MAINTENANCE_STAFF, ROLE_TYPE.USER])
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'id', description: 'Image ID' })
  @ApiOkResponse({
    type: FileURLOkResponse,
    description: 'Get image successfully',
  })
  @ApiNotFoundResponse({
    type: FileNotFoundResponseDto,
    description: 'File not found',
  })
  @ApiBadRequestResponse({
    description: 'File not image',
    type: FileNotImageResponseDto,
  })
  getUrl(@Param('id') imageId: string): Promise<string | undefined> {
    return this.imageService.getImageUrl(imageId);
  }

  @Delete('images/:id')
  @Auth([ROLE_TYPE.MAINTENANCE_STAFF, ROLE_TYPE.USER])
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'id', description: 'Image ID' })
  @ApiOkResponse({
    type: SuccessMetaResponseDto,
    description: 'Delete image successfully',
  })
  @ApiUnauthorizedResponse()
  @ApiNotFoundResponse({
    type: FileNotFoundResponseDto,
    description: 'File not found',
  })
  @ApiServiceUnavailableResponse({
    type: FileNotHandleResponseDto,
    description: 'Failed to delete file',
  })
  async deleteImage(@Param('id') imageId: string): Promise<void> {
    await this.imageService.deleteImage(imageId);
  }
}
