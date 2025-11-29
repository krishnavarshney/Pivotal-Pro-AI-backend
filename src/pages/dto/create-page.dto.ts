import { IsString, IsNotEmpty, IsOptional, IsJSON } from 'class-validator';

export class CreatePageDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  @IsJSON()
  configuration?: string;

  @IsString()
  @IsOptional()
  @IsJSON()
  layouts?: string;

  @IsString()
  @IsOptional()
  @IsJSON()
  widgetsData?: string;

  @IsString()
  @IsOptional()
  @IsJSON()
  globalFilters?: string;

  @IsString()
  @IsNotEmpty()
  workspaceId: string;
}