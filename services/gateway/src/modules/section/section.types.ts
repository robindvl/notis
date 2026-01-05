export type TPageSnippet = { id: string; name: string; emoji: string };

export type TSection = {
  id: string;
  name: string;
  pages: TPageSnippet[];
  space_id: string;
};

export type TSections = TSection[];
