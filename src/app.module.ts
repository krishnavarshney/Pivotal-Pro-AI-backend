import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { WorkspacesModule } from './workspaces/workspaces.module';
import { FilesModule } from './files/files.module';
import { PagesModule } from './pages/pages.module';
import { WidgetsModule } from './widgets/widgets.module';
import * as redisStore from 'cache-manager-redis-store';
import { ConfigModule } from '@nestjs/config';
import { DataSourcesModule } from './data-sources/data-sources.module';
import { AiModule } from './ai/ai.module';
import { StoriesModule } from './stories/stories.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    PrismaModule,
    WorkspacesModule,
    CacheModule.register({
      store: redisStore,
      host: 'localhost',
      port: 6379, // Ensure this matches your Redis configuration
      ttl: 300, // seconds
    }),
    FilesModule,
    PagesModule,
    WidgetsModule,
    DataSourcesModule,
    AiModule,
    StoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
