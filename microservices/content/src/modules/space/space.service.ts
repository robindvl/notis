import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { SpacesApi } from 'src/@generated/api';
import { Space, SpaceCreate, SpaceUpdate } from 'src/@generated/models';

@Injectable()
export class SpacesService implements SpacesApi {
  constructor() {}

  getSpaces(): Space[] | Promise<Space[]> | Observable<Space[]> {
    const newId = Math.round(Math.random() * 1000);
    return [
      {
        id: newId,
        name: `Пространство ${newId}`,
      },
    ];
  }

  createSpace(
    spaceCreate: SpaceCreate,
  ): Space | Promise<Space> | Observable<Space> {
    const newId = Math.round(Math.random() * 1000);
    return {
      id: newId,
      ...spaceCreate,
    };
  }

  updateSpace(
    id: number,
    spaceUpdate: SpaceUpdate,
  ): Space | Promise<Space> | Observable<Space> {
    return {
      id: id,
      ...spaceUpdate,
    };
  }
}
