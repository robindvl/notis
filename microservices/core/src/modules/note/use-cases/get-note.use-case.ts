import { Injectable } from '@nestjs/common';
import { Note, NoteRepository, NoteNotFoundException } from '@repo/domain';

@Injectable()
export class GetNoteUseCase {
  constructor(private readonly repository: NoteRepository) {}

  async execute(id: string): Promise<Note> {
    const note = await this.repository.findById(id);
    if (!note) {
      throw new NoteNotFoundException(id);
    }
    return note;
  }
}

