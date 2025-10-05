import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { SpacesApi } from 'src/@generated/api';
import { Block, Space, SpaceCreate, SpaceUpdate } from 'src/@generated/models';

@Injectable()
export class SpacesService implements SpacesApi {
  constructor() {}

  spacesGet(): Space | Promise<Space> | Observable<Space> {
    const newId = Math.round(Math.random() * 1000);
    return {
      id: newId,
      name: `Пространство ${newId}`,
    };
  }

  spacesIdPost(
    id: number,
    spaceUpdate: SpaceUpdate,
  ): Block | Promise<Block> | Observable<Block> {
    return {
      id: id,
      ...spaceUpdate,
    };
  }

  spacesPost(
    spaceCreate: SpaceCreate,
  ): Space | Promise<Space> | Observable<Space> {
    const newId = Math.round(Math.random() * 1000);
    return {
      id: newId,
      ...spaceCreate,
    };
  }
}
