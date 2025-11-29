import { Injectable } from '@nestjs/common';

@Injectable()
export class FilesService {
  constructor() {}

  async generatePresignedUrl(fileName: string, contentType: string) {
    // Placeholder for file upload logic without AWS S3
    return { url: 'http://localhost:3000/upload/' + fileName };
  }
}
