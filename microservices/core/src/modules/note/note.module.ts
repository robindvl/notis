import { Module } from '@nestjs/common';
import { NoteRepository } from '@repo/domain';
import { NoteRepositoryMock } from './repositories/note.repository.mock';
import { NoteService } from './note.service';

@Module({
  providers: [
    NoteService,
    {
      provide: NoteRepository,
      useClass: NoteRepositoryMock,
    },
  ],
  exports: [NoteService, NoteRepository],
})
export class NoteModule {}

