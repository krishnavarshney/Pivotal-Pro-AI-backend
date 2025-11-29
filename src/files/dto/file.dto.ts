import { IsString } from 'class-validator';

export class GeneratePresignedUrlDto {
  @IsString()
  fileName!: string;

  @IsString()
  contentType!: string;
}