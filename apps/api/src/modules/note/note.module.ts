import { Module } from '@nestjs/common';
import { NoteRepository } from '@repo/domain';

import { NoteTrpcRouter } from './note.trpc';
import { NoteService } from './note.service';
import { NoteRepositoryRemote } from './repositories/note.repository.remote';
import { NoteRepositoryMock } from './repositories/note.repository.mock';
import { getRepositoryImplementation } from '../../common/repository-factory';

@Module({
  providers: [
    NoteTrpcRouter,
    NoteService,
    {
      provide: NoteRepository,
      useClass: getRepositoryImplementation<NoteRepository>(NoteRepositoryRemote, NoteRepositoryMock),
    },
  ],
  exports: [NoteService, NoteTrpcRouter],
})
export class NoteModule {}
