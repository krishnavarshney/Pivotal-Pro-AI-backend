import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { FilesService } from './files.service';
import { GeneratePresignedUrlDto } from './dto/file.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('presigned-url')
  async generatePresignedUrl(@Body() generatePresignedUrlDto: GeneratePresignedUrlDto) {
    return this.filesService.generatePresignedUrl(
      generatePresignedUrlDto.fileName,
      generatePresignedUrlDto.contentType,
    );
  }
}
