import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Block, Space, SpaceCreate, SpaceUpdate } from '../models';

@Injectable()
export abstract class SpacesApi {
  abstract spacesGet(
    request: Request,
  ): Space | Promise<Space> | Observable<Space>;

  abstract spacesIdPost(
    id: number,
    spaceUpdate: SpaceUpdate,
    request: Request,
  ): Block | Promise<Block> | Observable<Block>;

  abstract spacesPost(
    spaceCreate: SpaceCreate,
    request: Request,
  ): Space | Promise<Space> | Observable<Space>;
}
