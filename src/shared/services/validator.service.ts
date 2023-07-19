import { Injectable } from '@nestjs/common';

@Injectable()
export class ValidatorService {
  public isImage(mimeType: string): boolean {
    const imageMimeTypes = [
      'image/jpeg',
      'image/png',
      'image/jpg',
      'image/svg+xml',
      'image/webp',
      'image/avif',
      'image/gif',
    ];

    return imageMimeTypes.includes(mimeType);
  }
}
