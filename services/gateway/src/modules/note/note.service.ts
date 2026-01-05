import { Injectable } from '@nestjs/common';
import { Note, NoteRepository } from '@repo/domain';

@Injectable()
export class NoteService {
  constructor(
    private readonly noteRepository: NoteRepository,
  ) {}

  async list(): Promise<Note[]> {
    return this.noteRepository.findBySpaceId('mock-space');
  }

  async findById(id: string): Promise<Note | null> {
    return this.noteRepository.findById(id);
  }
}

