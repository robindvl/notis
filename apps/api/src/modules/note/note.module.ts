import { Module } from '@nestjs/common';
import { NoteRepository } from '@repo/domain';

import { NoteTrpcRouter } from './note.trpc';
import { NoteService } from './note.service';
import { NoteRepositoryRemote } from './repositories/note.repository.remote';

@Module({
  providers: [
    NoteTrpcRouter,
    NoteService,
    {
      provide: NoteRepository,
      useClass: NoteRepositoryRemote,
    },
  ],
  exports: [NoteService, NoteTrpcRouter],
})
export class NoteModule {}
