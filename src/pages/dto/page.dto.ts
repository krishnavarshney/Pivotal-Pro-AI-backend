import { IsString, IsOptional, IsObject } from 'class-validator';

export class CreatePageDto {
  @IsString()
  name: string;

  @IsString()
  workspaceId: string;

  @IsObject()
  @IsOptional()
  configuration?: object;

  @IsObject()
  @IsOptional()
  layouts?: object;

  @IsObject()
  @IsOptional()
  widgets?: object;
}

export class UpdatePageDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsObject()
  @IsOptional()
  configuration?: object;

  @IsObject()
  @IsOptional()
  layouts?: object;

  @IsObject()
  @IsOptional()
  widgets?: object;
}