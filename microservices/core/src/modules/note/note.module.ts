import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoteRepository } from '@repo/domain';
import { NoteRepositoryTypeOrm } from './repositories/note.repository.typeorm';
import { NoteService } from './note.service';
import { NoteEntity } from './entities/note.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NoteEntity])],
  providers: [
    NoteService,
    {
      provide: NoteRepository,
      useClass: NoteRepositoryTypeOrm,
    },
  ],
  exports: [NoteService, NoteRepository],
})
export class NoteModule {}

