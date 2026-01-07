import { Note } from '../entities/note';

export type NoteCreateDto = Omit<Note, 'id' | 'createdAt' | 'updatedAt'>;

export type NoteUpdateDto = Partial<NoteCreateDto>;
