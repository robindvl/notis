import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoteRepository } from '@repo/domain';
import { NoteRepositoryTypeOrm } from './repositories/note.repository.typeorm';
import { NoteService } from './note.service';
import { NoteEntity } from './entities/note.entity';
import { CreateNoteUseCase } from './use-cases/create-note.use-case';
import { UpdateNoteUseCase } from './use-cases/update-note.use-case';
import { GetNoteUseCase } from './use-cases/get-note.use-case';
import { DeleteNoteUseCase } from './use-cases/delete-note.use-case';
import { GetNotesUseCase } from './use-cases/get-notes.use-case';

const UseCases = [
  CreateNoteUseCase,
  UpdateNoteUseCase,
  GetNoteUseCase,
  DeleteNoteUseCase,
  GetNotesUseCase,
];

@Module({
  imports: [TypeOrmModule.forFeature([NoteEntity])],
  providers: [
    NoteService,
    ...UseCases,
    {
      provide: NoteRepository,
      useClass: NoteRepositoryTypeOrm,
    },
  ],
  exports: [NoteService, NoteRepository, ...UseCases],
})
export class NoteModule {}