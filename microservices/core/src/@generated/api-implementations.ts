import { Type } from '@nestjs/common';
import { NoteApi } from './api';
import { SpaceApi } from './api';

/**
 * Provide this type to {@link ApiModule} to provide your API implementations
**/
export type ApiImplementations = {
  noteApi: Type<NoteApi>
  spaceApi: Type<SpaceApi>
};
