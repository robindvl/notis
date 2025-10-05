import { Body, Controller, Get, Post, Put, Param, Query, Req } from '@nestjs/common';
import { Observable } from 'rxjs';
import { SpacesApi } from '../api';
import { Space, SpaceCreate, SpaceUpdate,  } from '../models';

@Controller()
export class SpacesApiController {
  constructor(private readonly spacesApi: SpacesApi) {}

  @Post('/spaces')
  createSpace(@Body() spaceCreate: SpaceCreate, @Req() request: Request): Space | Promise<Space> | Observable<Space> {
    return this.spacesApi.createSpace(spaceCreate, request);
  }

  @Get('/spaces/:id')
  getSpace(@Param('id') id: number, @Req() request: Request): Space | Promise<Space> | Observable<Space> {
    return this.spacesApi.getSpace(id, request);
  }

  @Get('/spaces')
  getSpaces(@Req() request: Request): Array<Space> | Promise<Array<Space>> | Observable<Array<Space>> {
    return this.spacesApi.getSpaces(request);
  }

  @Put('/spaces/:id')
  updateSpace(@Param('id') id: number, @Body() spaceUpdate: SpaceUpdate, @Req() request: Request): Space | Promise<Space> | Observable<Space> {
    return this.spacesApi.updateSpace(id, spaceUpdate, request);
  }

} 