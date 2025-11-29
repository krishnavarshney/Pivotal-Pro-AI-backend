import { IsString, IsOptional, IsUUID } from 'class-validator';

export class CreateWorkspaceDto {
  @IsUUID()
  id!: string;

  @IsString()
  name!: string;

  @IsString()
  @IsOptional()
  description?: string;
}

export class UpdateWorkspaceDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;
}