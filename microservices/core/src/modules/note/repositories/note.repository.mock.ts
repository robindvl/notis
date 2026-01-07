import { Injectable } from '@nestjs/common';
import { Note, NoteCreateDto, NoteRepository, NoteType, NoteUpdateDto, NoteNotFoundException, Space } from '@repo/domain';
import { faker } from '@faker-js/faker/locale/ru';
import { uuidv7 } from 'uuidv7';
import { seedNotes } from '../note.seed';

@Injectable()
export class NoteRepositoryMock extends NoteRepository {
  private notes: Note[] = [];
  private generatedSpaceIds: Set<string> = new Set();

  private async generateNotesForSpace(spaceId: string) {
    if (this.generatedSpaceIds.has(spaceId)) return;

    this.generatedSpaceIds.add(spaceId);
    // Use the same seed logic as the real database
    await seedNotes(this, { id: spaceId } as Space);
  }

  async findById(id: string): Promise<Note | null> {
    return this.notes.find((n) => n.id === id) || null;
  }

  async findBySpaceId(spaceId: string): Promise<Note[]> {
    await this.generateNotesForSpace(spaceId);
    return this.notes.filter((n) => n.spaceId === spaceId);
  }

  async findBySectionId(sectionId: string): Promise<Note[]> {
    return this.notes.filter((n) => n.sectionId === sectionId);
  }

  async findByParentId(parentId: string): Promise<Note[]> {
    return this.notes.filter((n) => n.parentId === parentId);
  }

  async create(note: NoteCreateDto): Promise<Note> {
    const newNote: Note = {
      ...note,
      id: uuidv7(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.notes.push(newNote);
    return newNote;
  }

  async update(id: string, data: NoteUpdateDto): Promise<Note> {
    const index = this.notes.findIndex((n) => n.id === id);
    if (index === -1) throw new NoteNotFoundException(id);

    const updatedNote: Note = {
      ...this.notes[index],
      ...data,
      id,
      updatedAt: new Date(),
    };
    this.notes[index] = updatedNote;

    return updatedNote;
  }

  async delete(id: string): Promise<void> {
    this.notes = this.notes.filter((n) => n.id !== id);
  }

  async deleteAll(): Promise<void> {
    this.notes = [];
  }

  async reorder(parentId: string, noteIds: string[]): Promise<void> {
    // mock implementation
  }
}
