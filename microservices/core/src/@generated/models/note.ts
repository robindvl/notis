

export interface Note { 
  id: string;
  title: string;
  body?: string;
  emoji?: string;
  type: Note.TypeEnum;
  parentId?: string;
  sectionId?: string;
  spaceId: string;
  content?: object;
  createdAt: string;
  updatedAt: string;
}
export namespace Note {
  export const TypeEnum = {
    Note: 'note',
    Section: 'section',
    Paragraph: 'paragraph',
    NoteTask: 'note_task'
  } as const;
  export type TypeEnum = typeof TypeEnum[keyof typeof TypeEnum];
}


