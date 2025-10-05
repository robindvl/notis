import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Block, BlockCreate, BlockUpdate } from '../models';

@Injectable()
export abstract class BlocksApi {
  abstract blocksGet(
    request: Request,
  ): Array<Block> | Promise<Array<Block>> | Observable<Array<Block>>;

  abstract blocksIdPost(
    id: number,
    blockUpdate: BlockUpdate,
    request: Request,
  ): Block | Promise<Block> | Observable<Block>;

  abstract blocksPost(
    blockCreate: BlockCreate,
    request: Request,
  ): Block | Promise<Block> | Observable<Block>;
}
