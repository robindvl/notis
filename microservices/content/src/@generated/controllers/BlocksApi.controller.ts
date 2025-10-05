import { Body, Controller, Get, Post, Param, Req } from '@nestjs/common';
import { Observable } from 'rxjs';
import { BlocksApi } from '../api';
import { Block, BlockCreate, BlockUpdate } from '../models';

@Controller()
export class BlocksApiController {
  constructor(private readonly blocksApi: BlocksApi) {}

  @Get('/blocks')
  blocksGet(
    @Req() request: Request,
  ): Array<Block> | Promise<Array<Block>> | Observable<Array<Block>> {
    return this.blocksApi.blocksGet(request);
  }

  @Post('/blocks/:id')
  blocksIdPost(
    @Param('id') id: number,
    @Body() blockUpdate: BlockUpdate,
    @Req() request: Request,
  ): Block | Promise<Block> | Observable<Block> {
    return this.blocksApi.blocksIdPost(id, blockUpdate, request);
  }

  @Post('/blocks')
  blocksPost(
    @Body() blockCreate: BlockCreate,
    @Req() request: Request,
  ): Block | Promise<Block> | Observable<Block> {
    return this.blocksApi.blocksPost(blockCreate, request);
  }
}
