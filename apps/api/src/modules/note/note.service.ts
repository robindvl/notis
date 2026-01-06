import { Injectable } from '@nestjs/common';
import { Note, NoteRepository } from '@repo/domain';

@Injectable()
export class NoteService {
  constructor(
    private readonly noteRepository: NoteRepository,
  ) {}

  async list(spaceId: string): Promise<Note[]> {
    return this.noteRepository.findBySpaceId(spaceId);
  }

  async findById(id: string): Promise<Note | null> {
    return this.noteRepository.findById(id);
  }
}

