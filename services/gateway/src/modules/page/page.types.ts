import type { TSection } from '../section/section.types';

export type TPage = {
  id: string;
  name: string;
  emoji: string;
  section: TSection;
};

export type TPages = TPage[];
