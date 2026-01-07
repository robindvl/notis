import { Injectable } from '@nestjs/common';
import { Note, NoteUpdateDto, NoteRepository } from '@repo/domain';
import typia from 'typia';

@Injectable()
export class UpdateNoteUseCase {
  constructor(private readonly repository: NoteRepository) {}

  async execute(id: string, dto: NoteUpdateDto): Promise<Note> {
    typia.assert<NoteUpdateDto>(dto);
    return this.repository.update(id, dto);
  }
}

