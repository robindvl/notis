import { Body, Controller, Get, Post, Put, Param, Query, Req } from '@nestjs/common';
import { Observable } from 'rxjs';
import { BlocksApi } from '../api';
import { Block, BlockCreate, BlockUpdate,  } from '../models';

@Controller()
export class BlocksApiController {
  constructor(private readonly blocksApi: BlocksApi) {}

  @Post('/blocks')
  createBlock(@Body() blockCreate: BlockCreate, @Req() request: Request): Block | Promise<Block> | Observable<Block> {
    return this.blocksApi.createBlock(blockCreate, request);
  }

  @Get('/blocks/:id')
  getBlock(@Param('id') id: number, @Req() request: Request): Block | Promise<Block> | Observable<Block> {
    return this.blocksApi.getBlock(id, request);
  }

  @Get('/blocks')
  getBlocks(@Req() request: Request): Array<Block> | Promise<Array<Block>> | Observable<Array<Block>> {
    return this.blocksApi.getBlocks(request);
  }

  @Put('/blocks/:id')
  updateBlock(@Param('id') id: number, @Body() blockUpdate: BlockUpdate, @Req() request: Request): Block | Promise<Block> | Observable<Block> {
    return this.blocksApi.updateBlock(id, blockUpdate, request);
  }

} 