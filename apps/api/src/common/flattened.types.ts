type FlattenedKeys<T, Prefix extends string = ''> = {
  [K in keyof T]: T[K] extends object
    ? FlattenedKeys<T[K], `${Prefix}${K & string}.`>
    : `${Prefix}${K & string}`;
}[keyof T];

type Keys<T> = FlattenedKeys<T>;

export type KeysArray<T> = Keys<T>[];
