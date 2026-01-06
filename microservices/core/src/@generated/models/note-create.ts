

export interface NoteCreate { 
  title: string;
  body?: string;
  emoji?: string;
  type: NoteCreate.TypeEnum;
  parentId?: string;
  sectionId?: string;
  spaceId: string;
  content?: object;
}
export namespace NoteCreate {
  export const TypeEnum = {
    Note: 'note',
    Section: 'section',
    Paragraph: 'paragraph',
    NoteTask: 'note_task'
  } as const;
  export type TypeEnum = typeof TypeEnum[keyof typeof TypeEnum];
}


