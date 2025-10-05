import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Space, SpaceCreate, SpaceUpdate,  } from '../models';


@Injectable()
export abstract class SpacesApi {

  abstract createSpace(spaceCreate: SpaceCreate,  request: Request): Space | Promise<Space> | Observable<Space>;


  abstract getSpaces( request: Request): Array<Space> | Promise<Array<Space>> | Observable<Array<Space>>;


  abstract updateSpace(id: number, spaceUpdate: SpaceUpdate,  request: Request): Space | Promise<Space> | Observable<Space>;

} 