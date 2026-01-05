import { Note } from '../entities/note';

export interface NoteRepository {
  findById(id: string): Promise<Note | null>;
  findBySpaceId(spaceId: string): Promise<Note[]>;
  findBySectionId(sectionId: string): Promise<Note[]>;
  findByParentId(parentId: string): Promise<Note[]>;
  create(note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>): Promise<Note>;
  update(id: string, note: Partial<Note>): Promise<Note>;
  delete(id: string): Promise<void>;
  reorder(parentId: string, noteIds: string[]): Promise<void>;
}
