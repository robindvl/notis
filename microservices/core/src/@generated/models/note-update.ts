

export interface NoteUpdate { 
  title?: string;
  body?: string;
  emoji?: string;
  type?: NoteUpdate.TypeEnum;
  content?: Record<string, unknown>;
}
export namespace NoteUpdate {
  export const TypeEnum = {
    Note: 'note',
    Section: 'section',
    Paragraph: 'paragraph',
    NoteTask: 'note_task'
  } as const;
  export type TypeEnum = typeof TypeEnum[keyof typeof TypeEnum];
}


