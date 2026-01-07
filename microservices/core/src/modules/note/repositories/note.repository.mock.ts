import { Injectable } from '@nestjs/common';
import { Note, NoteCreateDto, NoteRepository, NoteType, NoteUpdateDto } from '@repo/domain';
import { faker } from '@faker-js/faker/locale/ru';
import { uuidv7 } from 'uuidv7';

@Injectable()
export class NoteRepositoryMock extends NoteRepository {
  private notes: Note[] = [];
  private generatedSpaceIds: Set<string> = new Set();

  private generateNotesForSpace(spaceId: string) {
    if (this.generatedSpaceIds.has(spaceId)) return;

    const sections: Note[] = Array.from({ length: 2 }).map((_, i) => ({
      id: `section-${spaceId}-${i}`,
      title: faker.lorem.sentence(2).replace('.', ''),
      body: faker.lorem.sentences(2),
      emoji: i === 0 ? '📚' : '🗄️',
      type: NoteType.Section,
      spaceId,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    const sectionNotes: Note[] = sections.flatMap((section) =>
      Array.from({ length: 2 }).map(() => ({
        id: uuidv7(),
        title: faker.lorem.sentence(3).replace('.', ''),
        body: faker.lorem.sentences(3),
        emoji: faker.helpers.arrayElement(['📝', '📊', '📓', '📗']),
        type: NoteType.Note,
        spaceId,
        sectionId: section.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
    );

    const rootNotes: Note[] = Array.from({ length: 2 }).map(() => ({
      id: uuidv7(),
      title: faker.lorem.sentence(2).replace('.', ''),
      body: faker.lorem.sentences(2),
      emoji: '🌱',
      type: NoteType.Note,
      spaceId,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    this.notes.push(...sections, ...sectionNotes, ...rootNotes);
    this.generatedSpaceIds.add(spaceId);
  }

  async findById(id: string): Promise<Note | null> {
    return this.notes.find((n) => n.id === id) || null;
  }

  async findBySpaceId(spaceId: string): Promise<Note[]> {
    this.generateNotesForSpace(spaceId);
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
    if (index === -1) throw new Error('Note not found');

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

  async reorder(parentId: string, noteIds: string[]): Promise<void> {
    // mock implementation
  }
}