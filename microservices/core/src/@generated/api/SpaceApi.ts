import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Space, SpaceCreate, SpaceUpdate,  } from '../models';


@Injectable()
export abstract class SpaceApi {

  abstract createSpace(spaceCreate: SpaceCreate,  request: Request): Space | Promise<Space> | Observable<Space>;


  abstract deleteSpace(id: string,  request: Request): void | Promise<void> | Observable<void>;


  abstract getSpace(id: string,  request: Request): Space | Promise<Space> | Observable<Space>;


  abstract getSpaces( request: Request): Array<Space> | Promise<Array<Space>> | Observable<Array<Space>>;


  abstract updateSpace(id: string, spaceUpdate: SpaceUpdate,  request: Request): Space | Promise<Space> | Observable<Space>;

} 