import { Body, Controller, Delete, Get, Post, Put, Param, Query, Req } from '@nestjs/common';
import { Observable } from 'rxjs';
import { SpaceApi } from '../api';
import { Space, SpaceCreate, SpaceUpdate,  } from '../models';

@Controller()
export class SpaceApiController {
  constructor(private readonly spaceApi: SpaceApi) {}

  @Post('/space')
  createSpace(@Body() spaceCreate: SpaceCreate, @Req() request: Request): Space | Promise<Space> | Observable<Space> {
    return this.spaceApi.createSpace(spaceCreate, request);
  }

  @Delete('/space/:id')
  deleteSpace(@Param('id') id: string, @Req() request: Request): void | Promise<void> | Observable<void> {
    return this.spaceApi.deleteSpace(id, request);
  }

  @Get('/space/:id')
  getSpace(@Param('id') id: string, @Req() request: Request): Space | Promise<Space> | Observable<Space> {
    return this.spaceApi.getSpace(id, request);
  }

  @Get('/space')
  getSpaces(@Req() request: Request): Array<Space> | Promise<Array<Space>> | Observable<Array<Space>> {
    return this.spaceApi.getSpaces(request);
  }

  @Put('/space/:id')
  updateSpace(@Param('id') id: string, @Body() spaceUpdate: SpaceUpdate, @Req() request: Request): Space | Promise<Space> | Observable<Space> {
    return this.spaceApi.updateSpace(id, spaceUpdate, request);
  }

} 