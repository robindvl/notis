import { Injectable } from '@nestjs/common';
import { Note, NoteCreateDto, NoteRepository } from '@repo/domain';
import typia from 'typia';

@Injectable()
export class CreateNoteUseCase {
  constructor(private readonly repository: NoteRepository) {}

  async execute(dto: NoteCreateDto): Promise<Note> {
    typia.assert<NoteCreateDto>(dto);
    return this.repository.create(dto);
  }
}

