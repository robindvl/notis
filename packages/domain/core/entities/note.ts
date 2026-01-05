export interface Note {
  id: string;
  title: string;
  body?: string;
  emoji?: string;
  type: 'note' | 'section' | 'paragraph' | 'note_task';
  parentId?: string;
  sectionId?: string;
  spaceId: string;
  content?: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}
