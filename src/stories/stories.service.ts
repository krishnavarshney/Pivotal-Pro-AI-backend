import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StoriesService {
    constructor(private prisma: PrismaService) { }

    async create(workspaceId: string, data: { title: string; pages: any }) {
        return this.prisma.story.create({
            data: {
                workspaceId,
                title: data.title,
                pages: data.pages,
            },
        });
    }

    async findAll(workspaceId: string) {
        return this.prisma.story.findMany({
            where: { workspaceId },
            orderBy: { title: 'asc' }, // Or createdAt if you add it
        });
    }

    async findOne(id: string) {
        return this.prisma.story.findUnique({
            where: { id },
        });
    }

    async update(id: string, data: { title?: string; pages?: any }) {
        return this.prisma.story.update({
            where: { id },
            data,
        });
    }

    async remove(id: string) {
        return this.prisma.story.delete({
            where: { id },
        });
    }
}
