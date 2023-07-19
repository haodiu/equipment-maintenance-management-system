import { Injectable, Logger } from '@nestjs/common';
import ImageKit from 'imagekit';
import mime from 'mime-types';

import { FileNotFoundException } from '../../exceptions';
import type { IFile } from '../../interfaces/IFile';
import { ApiConfigService } from './api-config.service';
import { GeneratorService } from './generator.service';

@Injectable()
export class ImageService {
  private logger = new Logger('ImageService');

  constructor(
    private readonly generatorService: GeneratorService,
    private readonly configService: ApiConfigService,
  ) {}

  private getImageKitInstance(): ImageKit {
    const { publicKey, privateKey, baseURL, imageKitId } =
      this.configService.imageKitConfig;

    const urlEndpoint = `${baseURL}/${imageKitId}`;

    return new ImageKit({
      publicKey,
      privateKey,
      urlEndpoint,
    });
  }

  /**
   * Upload a image file into imageKit server
   * @param file
   * @returns Promise<string> fileId on imageKit server
   */
  async uploadImage(file: IFile) {
    const imageKit = this.getImageKitInstance();

    const fileName = this.generatorService.fileName(
      <string>mime.extension(file.mimetype),
    );
    const key = `images/${fileName}`;

    try {
      const { fileId } = await imageKit.upload({
        file: file.buffer,
        fileName: key,
        folder: '/Images/',
        useUniqueFileName: true,
        responseFields: ['fileId'],
      });

      return fileId;
    } catch (error) {
      this.logger.error('Upload image failed:', error);
    }
  }

  /**
   * Get the image URL based on the file ID from ImageKit
   * @param fileId The ID of the file in ImageKit
   * @returns Promise<string | undefined> The URL of the image
   */
  async getImageUrl(fileId: string) {
    const imageKit = this.getImageKitInstance();

    try {
      const fileDetails = await imageKit.getFileDetails(fileId);

      return fileDetails.url;
    } catch (error) {
      this.logger.error('File not found:', error);

      throw new FileNotFoundException('File not found');
    }
  }

  /**
   * Delete an image file from the ImageKit server
   * @param fileId The id of the image to be deleted
   * @returns Promise<boolean> indicating whether the deletion was successful
   */
  async deleteImage(fileId: string) {
    const imageKit = this.getImageKitInstance();

    try {
      await imageKit.deleteFile(fileId);

      return true;
    } catch (error) {
      this.logger.error('Failed to delete file: ', error);

      throw new FileNotFoundException('File not found');
    }
  }
}
