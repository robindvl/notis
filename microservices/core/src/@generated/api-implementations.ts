import { Type } from '@nestjs/common';
import { BlocksApi } from './api';
import { SpacesApi } from './api';

/**
 * Provide this type to {@link ApiModule} to provide your API implementations
**/
export type ApiImplementations = {
  blocksApi: Type<BlocksApi>
  spacesApi: Type<SpacesApi>
};
