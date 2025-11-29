import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import type { Request as ExpressRequest } from 'express';
import { WorkspacesService } from './workspaces.service';
import { CreateWorkspaceDto, UpdateWorkspaceDto } from './dto/workspace.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../auth/interfaces/user.interface';

@UseGuards(AuthGuard('jwt'))
@Controller('workspaces')
export class WorkspacesController {
  constructor(private readonly workspacesService: WorkspacesService) {}

  @Post()
  create(@Request() req: ExpressRequest, @Body() createWorkspaceDto: CreateWorkspaceDto) {
    const user = req.user as User;
    return this.workspacesService.create(user.id, createWorkspaceDto);
  }

  @Get()
  findAll(@Request() req: ExpressRequest) {
    const user = req.user as User;
    return this.workspacesService.findAll(user.id);
  }

  @Get(':id')
  findOne(
    @Request() req: ExpressRequest,
    @Param('id') id: string,
  ) {
    const user = req.user as User;
    return this.workspacesService.findOne(user.id, id);
  }

  @Patch(':id')
  update(
    @Request() req: ExpressRequest,
    @Param('id') id: string,
    @Body() updateWorkspaceDto: UpdateWorkspaceDto,
  ) {
    const user = req.user as User;
    return this.workspacesService.update(user.id, id, updateWorkspaceDto);
  }

  @Delete(':id')
  remove(@Request() req: ExpressRequest, @Param('id') id: string) {
    const user = req.user as User;
    return this.workspacesService.remove(user.id, id);
  }
}
