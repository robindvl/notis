import { Module } from '@nestjs/common';
import { NoteRepository } from '@repo/domain';

import { NoteTrpcRouter } from './note.trpc';
import { NoteService } from './note.service';
import { NoteRepositoryMock } from './repositories/note.repository.mock';

@Module({
  providers: [
    NoteTrpcRouter,
    NoteService,
    {
      provide: NoteRepository,
      useClass: NoteRepositoryMock,
    },
  ],
  exports: [NoteService, NoteTrpcRouter],
})
export class NoteModule {}
