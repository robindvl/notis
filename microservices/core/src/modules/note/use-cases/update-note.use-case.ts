import { Injectable } from '@nestjs/common';
import { Note, NoteUpdateDto, NoteRepository } from '@repo/domain';

@Injectable()
export class UpdateNoteUseCase {
  constructor(private readonly repository: NoteRepository) {}

  async execute(id: string, dto: NoteUpdateDto): Promise<Note> {
    return this.repository.update(id, dto);
  }
}

