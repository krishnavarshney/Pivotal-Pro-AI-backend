import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AiService {
    constructor(private prisma: PrismaService) { }

    async getAiConfig(userId: string) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: { aiConfig: true },
        });
        return user?.aiConfig || {};
    }

    async updateAiConfig(userId: string, config: any) {
        return this.prisma.user.update({
            where: { id: userId },
            data: { aiConfig: config },
            select: { aiConfig: true },
        });
    }
}
