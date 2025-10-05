import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Block, BlockCreate, BlockUpdate,  } from '../models';


@Injectable()
export abstract class BlocksApi {

  abstract createBlock(blockCreate: BlockCreate,  request: Request): Block | Promise<Block> | Observable<Block>;


  abstract getBlock(id: number,  request: Request): Block | Promise<Block> | Observable<Block>;


  abstract getBlocks( request: Request): Array<Block> | Promise<Array<Block>> | Observable<Array<Block>>;


  abstract updateBlock(id: number, blockUpdate: BlockUpdate,  request: Request): Block | Promise<Block> | Observable<Block>;

} 