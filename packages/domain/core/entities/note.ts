import { Section } from './section';

export interface Note {
  id: string;
  name: string;
  emoji?: string;
  type: 'note' | 'section' | 'paragraph' | 'note_task';
  parentId?: string;
  section?: Section;
  sectionId?: string;
  spaceId: string;
  content?: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}
