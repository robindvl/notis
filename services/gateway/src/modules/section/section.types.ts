export type TBlock = { id: number; name: string; emoji: string; type: 'page' };

export type TSection = {
  id: number;
  name: string;
  blocks: TBlock[];
  space_id: number;
};

export type TSections = TSection[];
