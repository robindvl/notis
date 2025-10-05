

export interface Block { 
  id?: number;
  name?: string;
  type?: Block.TypeEnum;
  parent_id?: number;
  body?: string;
  blocks?: Array<Block>;
}
export namespace Block {
  export const TypeEnum = {
    Section: 'section',
    Page: 'page',
    Paragraph: 'paragraph'
  } as const;
  export type TypeEnum = typeof TypeEnum[keyof typeof TypeEnum];
}


