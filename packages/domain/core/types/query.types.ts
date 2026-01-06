type FlattenedKeys<T, Prefix extends string = ''> = {
  [K in keyof T]: T[K] extends object
    ? FlattenedKeys<T[K], `${Prefix}${K & string}.`>
    : `${Prefix}${K & string}`;
}[keyof T];

type Keys<T> = FlattenedKeys<T>;

export type KeysArray<T> = Keys<T>[];

/**
 * Metadata for queries, allowing to specify which attributes to return
 */
export interface AttrMetaDto<T> {
  /**
   * List of attributes to return (supports nested paths with dot notation)
   */
  attr?: KeysArray<T>;
}

