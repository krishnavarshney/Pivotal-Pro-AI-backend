import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import type { Request as ExpressRequest } from 'express';
import { WidgetsService } from './widgets.service';
import { CreateWidgetDto } from './dto/create-widget.dto';
import { UpdateWidgetDto } from './dto/update-widget.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../auth/interfaces/user.interface';

@UseGuards(AuthGuard('jwt'))
@Controller('widgets')
export class WidgetsController {
  constructor(private readonly widgetsService: WidgetsService) {}

  @Post()
  create(@Request() req: ExpressRequest, @Body() createWidgetDto: CreateWidgetDto) {
    const user = req.user as User;
    return this.widgetsService.create(user.id, createWidgetDto);
  }

  @Get()
  findAll(@Request() req: ExpressRequest) {
    const user = req.user as User;
    return this.widgetsService.findAll(user.id);
  }

  @Get(':id')
  findOne(@Request() req: ExpressRequest, @Param('id') id: string) {
    const user = req.user as User;
    return this.widgetsService.findOne(user.id, id);
  }

  @Patch(':id')
  update(
    @Request() req: ExpressRequest,
    @Param('id') id: string,
    @Body() updateWidgetDto: UpdateWidgetDto,
  ) {
    const user = req.user as User;
    return this.widgetsService.update(user.id, id, updateWidgetDto);
  }

  @Delete(':id')
  remove(@Request() req: ExpressRequest, @Param('id') id: string) {
    const user = req.user as User;
    return this.widgetsService.remove(user.id, id);
  }
}