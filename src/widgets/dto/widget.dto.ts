import { IsString, IsOptional, IsObject } from 'class-validator';

export class CreateWidgetDto {
  @IsString()
  name: string;

  @IsString()
  pageId: string;

  @IsObject()
  @IsOptional()
  configuration?: object;

  @IsObject()
  @IsOptional()
  layouts?: object;
}

export class UpdateWidgetDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsObject()
  @IsOptional()
  configuration?: object;

  @IsObject()
  @IsOptional()
  layouts?: object;
}