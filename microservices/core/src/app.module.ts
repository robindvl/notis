import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiModule } from './api.module';
import { SpaceService } from './modules/space/space.service';
import { NoteService } from './modules/note/note.service';
import { SpaceModule } from './modules/space/space.module';
import { NoteModule } from './modules/note/note.module';

@Module({
  imports: [
    ApiModule.forRoot(
      {
        spaceApi: SpaceService,
        noteApi: NoteService,
      },
      { modules: [SpaceModule, NoteModule] },
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
