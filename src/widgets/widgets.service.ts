import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWidgetDto } from './dto/create-widget.dto';
import { UpdateWidgetDto } from './dto/update-widget.dto';

@Injectable()
export class WidgetsService {
  constructor(private prisma: PrismaService) { }

  async create(userId: string, createWidgetDto: CreateWidgetDto) {
    console.log('WidgetsService.create called with:', createWidgetDto);
    try {
      return await this.prisma.widget.create({
        data: {
          title: createWidgetDto.title,
          configuration: createWidgetDto.configuration,
          layouts: createWidgetDto.layouts,
          widgetsData: createWidgetDto.widgetsData,
          page: {
            connect: { id: createWidgetDto.pageId },
          },
          owner: {
            connect: { id: userId },
          },

        },
      });
    } catch (error) {
      console.error('Error creating widget:', error);
      throw error;
    }
  }

  findAll(userId: string) {
    return this.prisma.widget.findMany({
      where: {
        ownerId: userId,
      },
    });
  }

  findOne(userId: string, id: string) {
    return this.prisma.widget.findUnique({
      where: {
        id,
        ownerId: userId,
      },
    });
  }

  update(userId: string, id: string, updateWidgetDto: UpdateWidgetDto) {
    return this.prisma.widget.update({
      where: {
        id,
        ownerId: userId,
      },
      data: updateWidgetDto,
    });
  }

  remove(userId: string, id: string) {
    return this.prisma.widget.delete({
      where: {
        id,
        ownerId: userId,
      },
    });
  }
}