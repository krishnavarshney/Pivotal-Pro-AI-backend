import { Body, Controller, Get, Post, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import type { Request as ExpressRequest } from 'express';
import { PagesService } from './pages.service';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UnauthorizedException } from '@nestjs/common';

@Controller('api/pages')
@UseGuards(JwtAuthGuard)
export class PagesController {
  constructor(private readonly pagesService: PagesService) { }

  @Post()
  async create(@Req() req: ExpressRequest, @Body() createPageDto: CreatePageDto) {
    if (!req.user || !req.user.id) {
      throw new UnauthorizedException('User not authenticated or user ID not found.');
    }
    console.log('Incoming request body:', createPageDto);
    console.log('User ID from request:', req.user.id);
    return this.pagesService.create(req.user.id, createPageDto);
  }

  @Get()
  findAll(@Req() req: ExpressRequest) {
    if (!req.user || !req.user.id) {
      throw new UnauthorizedException('User not authenticated or user ID not found.');
    }
    return this.pagesService.findAll(req.user.id);
  }

  @Get(':id')
  findOne(@Req() req: ExpressRequest, @Param('id') id: string) {
    if (!req.user || !req.user.id) {
      throw new UnauthorizedException('User not authenticated or user ID not found.');
    }
    return this.pagesService.findOne(req.user.id, id);
  }

  @Patch(':id')
  update(
    @Req() req: ExpressRequest,
    @Param('id') id: string,
    @Body() updatePageDto: UpdatePageDto,
  ) {
    if (!req.user || !req.user.id) {
      throw new UnauthorizedException('User not authenticated or user ID not found.');
    }
    return this.pagesService.update(req.user.id, id, updatePageDto);
  }

  @Delete(':id')
  remove(@Req() req: ExpressRequest, @Param('id') id: string) {
    if (!req.user || !req.user.id) {
      throw new UnauthorizedException('User not authenticated or user ID not found.');
    }
    return this.pagesService.remove(req.user.id, id);
  }
}