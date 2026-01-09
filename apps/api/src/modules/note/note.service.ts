// note.service.ts
import { Injectable } from '@nestjs/common';
import { Note, NoteCreateDto, NoteRepository, NoteUpdateDto } from '@repo/domain';

@Injectable()
export class NoteService {
  constructor(
      private readonly noteRepository: NoteRepository,
  ) {}

  async findById(id: string): Promise<Note> {
    const note = await this.noteRepository.findById(id);
    if (!note) {
      throw new Error(`Note with id ${id} not found`);
    }
    return note;
  }

  async list(spaceId: string): Promise<Note[]> {
    return this.noteRepository.findBySpaceId(spaceId);
  }

  async createNote(data: NoteCreateDto): Promise<Note> {
    return this.noteRepository.create({
      ...data,
      type: data.type || 'note',
      emoji: data.emoji || (data.type === 'section' ? '📁' : '📝'),
    });
  }

  async updateNote(id: string, data: NoteUpdateDto): Promise<Note> {
    return this.noteRepository.update(id, data);
  }
}
