import { Note } from '../entities/note';

export interface ContentService {
  createNote(spaceId: string, name: string, sectionId?: string, parentId?: string): Promise<Note>;
  updateNote(noteId: string, data: Partial<Note>): Promise<Note>;
  deleteNote(noteId: string): Promise<void>;
  reorderNotes(parentId: string, noteIds: string[]): Promise<void>;
}
