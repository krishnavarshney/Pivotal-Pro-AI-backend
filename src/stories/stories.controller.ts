import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Request } from '@nestjs/common';
import { StoriesService } from './stories.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api')
export class StoriesController {
    constructor(private readonly storiesService: StoriesService) { }

    @UseGuards(JwtAuthGuard)
    @Post('workspaces/:workspaceId/stories')
    create(@Param('workspaceId') workspaceId: string, @Body() createStoryDto: { title: string; pages: any }) {
        return this.storiesService.create(workspaceId, createStoryDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get('workspaces/:workspaceId/stories')
    findAll(@Param('workspaceId') workspaceId: string) {
        return this.storiesService.findAll(workspaceId);
    }

    @UseGuards(JwtAuthGuard)
    @Get('stories/:id')
    findOne(@Param('id') id: string) {
        return this.storiesService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Put('stories/:id')
    update(@Param('id') id: string, @Body() updateStoryDto: { title?: string; pages?: any }) {
        return this.storiesService.update(id, updateStoryDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('stories/:id')
    remove(@Param('id') id: string) {
        return this.storiesService.remove(id);
    }
}
