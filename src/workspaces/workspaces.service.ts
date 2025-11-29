import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWorkspaceDto, UpdateWorkspaceDto } from './dto/workspace.dto';

@Injectable()
export class WorkspacesService {
  constructor(private prisma: PrismaService) { }

  async create(userId: string, createWorkspaceDto: CreateWorkspaceDto) {
    return this.prisma.workspace.create({
      data: {
        id: createWorkspaceDto.id,
        name: createWorkspaceDto.name,
        userId: userId,
      },
    });
  }

  async findAll(userId: string) {
    return this.prisma.workspace.findMany({
      where: {
        userId: userId,
      },
      include: {
        pages: {
          include: {
            widgets: true,
          },
        },
      },
    });
  }

  async findOne(userId: string, id: string) {
    return this.prisma.workspace.findUnique({
      where: {
        id,
        userId: userId,
      },
      include: {
        pages: {
          include: {
            widgets: true,
          },
        },
      },
    });
  }

  async update(id: string, userId: string, updateWorkspaceDto: UpdateWorkspaceDto) {
    return this.prisma.workspace.update({
      where: {
        id,
        userId: userId,
      },
      data: updateWorkspaceDto,
    });
  }

  async remove(id: string, userId: string) {
    return this.prisma.workspace.delete({
      where: {
        id,
        userId: userId,
      },
    });
  }
}
