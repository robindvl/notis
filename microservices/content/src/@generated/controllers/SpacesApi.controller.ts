import { Body, Controller, Get, Post, Param, Req } from '@nestjs/common';
import { Observable } from 'rxjs';
import { SpacesApi } from '../api';
import { Block, Space, SpaceCreate, SpaceUpdate } from '../models';

@Controller()
export class SpacesApiController {
  constructor(private readonly spacesApi: SpacesApi) {}

  @Get('/spaces')
  spacesGet(
    @Req() request: Request,
  ): Space | Promise<Space> | Observable<Space> {
    return this.spacesApi.spacesGet(request);
  }

  @Post('/spaces/:id')
  spacesIdPost(
    @Param('id') id: number,
    @Body() spaceUpdate: SpaceUpdate,
    @Req() request: Request,
  ): Block | Promise<Block> | Observable<Block> {
    return this.spacesApi.spacesIdPost(id, spaceUpdate, request);
  }

  @Post('/spaces')
  spacesPost(
    @Body() spaceCreate: SpaceCreate,
    @Req() request: Request,
  ): Space | Promise<Space> | Observable<Space> {
    return this.spacesApi.spacesPost(spaceCreate, request);
  }
}
