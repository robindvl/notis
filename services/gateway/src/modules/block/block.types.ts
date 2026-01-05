import type { TSection } from '../section/section.types';

export type TBlock = {
  id: number;
  uuid: string;
  name: string;
  emoji: string;
  type: 'page';
  section: TSection;
};

export type TBlocks = TBlock[];

// type TBlock2 = {
//   id: number;
//   uuid: string;
//   name: string;
//   emoji: string;
//   type: 'page';
//   section: {
//     id: number;
//     name: string;
//     space_id: number;
//   };
// };

// type FlattenedKeys<T, Prefix extends string = ''> = {
//   [K in keyof T]: T[K] extends object
//     ? FlattenedKeys<T[K], `${Prefix}${K & string}.`>
//     : `${Prefix}${K & string}`;
// }[keyof T];

// type BlockKeys = FlattenedKeys<TBlock>;

// type BlockKeysArray = BlockKeys[];

// const result: BlockKeysArray = [];
