import { Injectable } from '@nestjs/common';
import { Note, NoteRepository } from '@repo/domain';
import { faker } from '@faker-js/faker/locale/ru';
import { uuidv7 } from 'uuidv7';

@Injectable()
export class NoteRepositoryMock extends NoteRepository {
  private notes: Note[] = [
    {
      id: uuidv7(),
      name: faker.lorem.paragraph(),
      emoji: faker.internet.emoji(),
      type: 'note',
      spaceId: uuidv7(),
      createdAt: new Date(),
      updatedAt: new Date(),
      section: {
        id: uuidv7(),
        name: 'Документация',
        notes: [],
        space_id: uuidv7(),
      },
    },
    {
      id: uuidv7(),
      name: faker.lorem.paragraph(),
      emoji: faker.internet.emoji(),
      type: 'note',
      spaceId: uuidv7(),
      createdAt: new Date(),
      updatedAt: new Date(),
      section: {
        id: uuidv7(),
        name: 'База данных',
        notes: [],
        space_id: uuidv7(),
      },
    },
  ];

  async findById(id: string): Promise<Note | null> {
    return this.notes.find((n) => n.id === id) || null;
  }

  async findBySpaceId(spaceId: string): Promise<Note[]> {
    return this.notes;
  }

  async findBySectionId(sectionId: string): Promise<Note[]> {
    return this.notes;
  }

  async findByParentId(parentId: string): Promise<Note[]> {
    return this.notes;
  }

  async create(note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>): Promise<Note> {
    const newNote: Note = {
      ...note,
      id: uuidv7(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.notes.push(newNote);
    return newNote;
  }

  async update(id: string, note: Partial<Note>): Promise<Note> {
    const index = this.notes.findIndex((n) => n.id === id);
    if (index === -1) throw new Error('Note not found');
    const updatedNote = { ...this.notes[index], ...note, id, updatedAt: new Date() } as Note;
    this.notes[index] = updatedNote;
    return updatedNote;
  }

  async delete(id: string): Promise<void> {
    this.notes = this.notes.filter((n) => n.id !== id);
  }

  async reorder(parentId: string, noteIds: string[]): Promise<void> {
    // mock implementation
  }
}

