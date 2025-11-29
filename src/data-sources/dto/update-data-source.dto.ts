import { PartialType } from '@nestjs/mapped-types';
import { CreateDataSourceDto } from './create-data-source.dto';
import { IsEnum, IsOptional, IsArray } from 'class-validator';
import { DataSourceStatus } from '@prisma/client';

export class UpdateDataSourceDto extends PartialType(CreateDataSourceDto) {
    @IsOptional()
    @IsEnum(DataSourceStatus)
    status?: DataSourceStatus;

    @IsOptional()
    @IsArray()
    transformations?: any[]; // We might handle transformations separately or as part of update
}
