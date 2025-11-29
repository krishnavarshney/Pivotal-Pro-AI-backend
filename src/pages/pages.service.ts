import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';

@Injectable()
export class PagesService {
  constructor(private prisma: PrismaService) { }

  async create(userId: string, createPageDto: CreatePageDto) {
    console.log('PagesService.create method entered.');
    console.log('Creating page with DTO:', createPageDto);

    const workspace = await this.prisma.workspace.findUnique({
      where: { id: createPageDto.workspaceId },
    });

    if (!workspace) {
      throw new NotFoundException(`Workspace with ID ${createPageDto.workspaceId} not found.`);
    }

    const newPage = await this.prisma.page.create({
      data: {
        id: createPageDto.id,
        name: createPageDto.name,
        workspace: {
          connect: { id: createPageDto.workspaceId },
        },
        owner: {
          connect: { id: userId },
        },
        layouts: createPageDto.layouts ? JSON.parse(createPageDto.layouts) : {},
        configuration: createPageDto.configuration ? JSON.parse(createPageDto.configuration) : {},
        widgetsData: createPageDto.widgetsData ? JSON.parse(createPageDto.widgetsData) : {},
        globalFilters: createPageDto.globalFilters ? JSON.parse(createPageDto.globalFilters) : [],
      },
    });
    console.log('Page created successfully:', newPage);
    return newPage;
  }

  findAll(userId: string) {
    return this.prisma.page.findMany({
      where: {
        ownerId: userId,
      },
    });
  }

  findOne(userId: string, id: string) {
    return this.prisma.page.findUnique({
      where: {
        id,
        ownerId: userId,
      },
    });
  }

  update(userId: string, id: string, updatePageDto: UpdatePageDto) {
    const dataToUpdate: any = { ...updatePageDto };
    if (updatePageDto.layouts) {
      dataToUpdate.layouts = JSON.parse(updatePageDto.layouts);
    }
    if (updatePageDto.configuration) {
      dataToUpdate.configuration = JSON.parse(updatePageDto.configuration);
    }
    if (updatePageDto.widgetsData) {
      dataToUpdate.widgetsData = JSON.parse(updatePageDto.widgetsData);
    }
    if (updatePageDto.globalFilters) {
      dataToUpdate.globalFilters = JSON.parse(updatePageDto.globalFilters);
    }

    return this.prisma.page.update({
      where: {
        id,
        ownerId: userId,
      },
      data: dataToUpdate,
    });
  }

  remove(userId: string, id: string) {
    return this.prisma.page.delete({
      where: {
        id,
        ownerId: userId,
      },
    });
  }
}