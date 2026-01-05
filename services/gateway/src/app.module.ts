import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TrpcModule } from './processors/trpc/trpc.module';
import { UserModule } from './modules/user/user.module';
import { SpaceModule } from './modules/space/space.module';
import { SectionModule } from './modules/section/section.module';
import { NoteModule } from './modules/note/note.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TrpcModule,
    UserModule,
    SpaceModule,
    SectionModule,
    NoteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
