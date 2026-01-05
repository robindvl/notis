import type { TSection } from '../section/section.types';

export type TPage = {
  id: number;
  uuid: string;
  name: string;
  emoji: string;
  section: TSection;
};

export type TPages = TPage[];
