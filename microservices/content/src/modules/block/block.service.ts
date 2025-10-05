import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { BlocksApi } from 'src/@generated/api';
import { Block, BlockCreate, BlockUpdate } from 'src/@generated/models';

import { BlockRepository } from './repositories/block.abstract';

@Injectable()
export class BlocksService implements BlocksApi {
  constructor(private readonly repository: BlockRepository) {}

  blocksGet(): Array<Block> | Promise<Array<Block>> | Observable<Array<Block>> {
    return this.repository.find();
  }

  blocksPost(
    blockCreate: BlockCreate,
  ): Block | Promise<Block> | Observable<Block> {
    return this.repository.create(blockCreate);
  }

  blocksIdPost(
    id: number,
    blockUpdate: BlockUpdate,
  ): Block | Promise<Block> | Observable<Block> {
    return this.repository.update(id, blockUpdate);
  }
}
