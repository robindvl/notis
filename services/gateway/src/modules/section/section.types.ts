export type TPageSnippet = { id: number; name: string; emoji: string };

export type TSection = {
  id: number;
  name: string;
  pages: TPageSnippet[];
  space_id: number;
};

export type TSections = TSection[];
