
import { Controller, Get, Put, Body, UseGuards, Request } from '@nestjs/common';
import { AiService } from './ai.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api/ai')
@UseGuards(JwtAuthGuard)
export class AiController {
    constructor(private readonly aiService: AiService) { }

    @Get('config')
    async getAiConfig(@Request() req: any) {
        return this.aiService.getAiConfig(req.user.id);
    }

    @Put('config')
    async updateAiConfig(@Request() req: any, @Body() config: any) {
        return this.aiService.updateAiConfig(req.user.id, config);
    }
}
