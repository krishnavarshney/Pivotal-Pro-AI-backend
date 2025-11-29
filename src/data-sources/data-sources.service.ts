import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDataSourceDto } from './dto/create-data-source.dto';
import { UpdateDataSourceDto } from './dto/update-data-source.dto';
import { DataSource, Transformation } from '@prisma/client';

@Injectable()
export class DataSourcesService {
    constructor(private prisma: PrismaService) { }

    async create(createDataSourceDto: CreateDataSourceDto) {
        const { data, ...rest } = createDataSourceDto;
        // Note: In a real app, 'data' might be stored in a separate table or object storage.
        // For now, we'll assume it's small enough to be part of the connectionDetails or handled elsewhere,
        // or we might need to extend the Prisma schema to support a 'data' JSON field if it's not there.
        // Looking at schema.prisma, DataSource doesn't have a 'data' field, but it has 'connectionDetails'.
        // If 'type' is 'file', we might store the raw data in a separate 'File' model or just assume it's transient for now.
        // However, the frontend expects 'data' to be returned.
        // Let's check if we can store it in 'connectionDetails' or if we need to adjust the schema.
        // For this implementation, we will assume 'connectionDetails' can hold the data for file types temporarily.

        // Actually, looking at the frontend, it expects 'data' property on the DataSource object.
        // The schema has 'connectionDetails' (Json) and 'fieldsSchema' (Json).
        // We should probably store the actual data in a separate table or file storage, but for simplicity/MVP,
        // let's store it in 'connectionDetails' under a 'data' key if it's a file upload.

        let connectionDetails = rest.connectionDetails || {};
        if (data) {
            connectionDetails = { ...connectionDetails, data };
        }

        return this.prisma.dataSource.create({
            data: {
                ...rest,
                connectionDetails,
                status: 'connected',
            },
            include: {
                transformations: true,
            },
        });
    }

    async findAll(workspaceId: string) {
        const sources = await this.prisma.dataSource.findMany({
            where: { workspaceId },
            include: {
                transformations: {
                    orderBy: { order: 'asc' }
                },
            },
        });

        return sources.map(source => {
            const connectionDetails = source.connectionDetails as any;
            return {
                ...source,
                data: connectionDetails?.data || [],
                fields: source.fieldsSchema,
            };
        });
    }

    async findOne(id: string) {
        const source = await this.prisma.dataSource.findUnique({
            where: { id },
            include: {
                transformations: {
                    orderBy: { order: 'asc' }
                },
            },
        });
        if (!source) return null;
        const connectionDetails = source.connectionDetails as any;
        return {
            ...source,
            data: connectionDetails?.data || [],
            fields: source.fieldsSchema,
        };
    }

    async update(id: string, updateDataSourceDto: UpdateDataSourceDto) {
        const { transformations, ...rest } = updateDataSourceDto;

        // Update the main data source fields
        const updatedSource = await this.prisma.dataSource.update({
            where: { id },
            data: rest,
        });

        // Handle transformations update if provided
        if (transformations && Array.isArray(transformations)) {
            // Delete existing transformations
            await this.prisma.transformation.deleteMany({
                where: { dataSourceId: id }
            });

            // Create new ones
            // We need to map the frontend transformation objects to the Prisma model
            // Frontend: { id, type, payload }
            // Prisma: { id, dataSourceId, order, type, payload }
            const newTransformations = transformations.map((t: any, index: number) => ({
                dataSourceId: id,
                order: index,
                type: t.type,
                payload: t.payload || {},
            }));

            if (newTransformations.length > 0) {
                await this.prisma.transformation.createMany({
                    data: newTransformations
                });
            }
        }

        return this.findOne(id);
    }

    async remove(id: string) {
        return this.prisma.dataSource.delete({
            where: { id },
        });
    }
}
