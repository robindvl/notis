import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TrpcModule } from './processors/trpc/trpc.module';
import { UserModule } from './modules/user/user.module';
import { SpaceModule } from './modules/space/space.module';
import { NoteModule } from './modules/note/note.module';
import { ProjectModule } from './modules/project/project.module';
import { TaskModule } from './modules/task/task.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TrpcModule,
    UserModule,
    SpaceModule,
    NoteModule,
    ProjectModule,
    TaskModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
