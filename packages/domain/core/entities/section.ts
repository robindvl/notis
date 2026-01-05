export type TNoteSnippet = { id: string; name: string; emoji: string };

export interface Section {
  id: string;
  name: string;
  notes: TNoteSnippet[];
  space_id: string;
}
