export const NoteType = {
  Note: 'note',
  Section: 'section',
  Paragraph: 'paragraph',
  NoteTask: 'note_task',
} as const;

export type NoteType = typeof NoteType[keyof typeof NoteType];

export interface Note {
  id: string;
  title: string;
  body?: string;
  emoji?: string;
  type: NoteType;
  parentId?: string;
  sectionId?: string;
  spaceId: string;
  content?: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}
