import { Note } from '../entities/note';

export abstract class NoteRepository {
  abstract findById(id: string): Promise<Note | null>;
  abstract findBySpaceId(spaceId: string): Promise<Note[]>;
  abstract findBySectionId(sectionId: string): Promise<Note[]>;
  abstract findByParentId(parentId: string): Promise<Note[]>;
  abstract create(note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>): Promise<Note>;
  abstract update(id: string, note: Partial<Note>): Promise<Note>;
  abstract delete(id: string): Promise<void>;
  abstract reorder(parentId: string, noteIds: string[]): Promise<void>;
}
