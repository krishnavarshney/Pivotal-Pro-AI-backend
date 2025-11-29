import { IsString, IsEnum, IsOptional, IsNotEmpty, IsObject } from 'class-validator';
import { DataSourceType, DataSourceStatus } from '@prisma/client';

export class CreateDataSourceDto {
    @IsString()
    @IsNotEmpty()
    workspaceId: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEnum(DataSourceType)
    type: DataSourceType;

    @IsOptional()
    @IsObject()
    connectionDetails?: any;

    @IsOptional()
    @IsString()
    storageRef?: string;

    @IsObject()
    fieldsSchema: any;

    @IsOptional()
    data?: any; // For file uploads, we might pass data directly initially
}
