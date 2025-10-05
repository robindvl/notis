import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

import { SpacesApi } from 'src/@generated/api';
import { Space, SpaceCreate, SpaceUpdate } from 'src/@generated/models';
import { SpaceRepository } from './repositories/space.abstract';

@Injectable()
export class SpacesService implements SpacesApi {
  constructor(private readonly repository: SpaceRepository) {}

  getSpaces(): Space[] | Promise<Space[]> | Observable<Space[]> {
    return this.repository.find();
  }

  createSpace(
    spaceCreate: SpaceCreate,
  ): Space | Promise<Space> | Observable<Space> {
    return this.repository.create(spaceCreate);
  }

  getSpace(id: number): Promise<Space> {
    return this.repository.findOne(Number(id)).then((item) => {
      if (!item) {
        throw new Error('Space not found');
      }
      return item;
    });
  }

  updateSpace(
    id: number,
    spaceUpdate: SpaceUpdate,
  ): Space | Promise<Space> | Observable<Space> {
    return this.repository.update(id, spaceUpdate);
  }
}
