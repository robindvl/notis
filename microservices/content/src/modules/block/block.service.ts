import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { BlocksApi } from 'src/@generated/api';
import { Block, BlockCreate, BlockUpdate } from 'src/@generated/models';

import { BlockRepository } from './repositories/block.abstract';

@Injectable()
export class BlocksService implements BlocksApi {
  constructor(private readonly repository: BlockRepository) {}

  getBlocks(): Array<Block> | Promise<Array<Block>> | Observable<Array<Block>> {
    return this.repository.find();
  }

  createBlock(
    blockCreate: BlockCreate,
  ): Block | Promise<Block> | Observable<Block> {
    return this.repository.create(blockCreate);
  }

  updateBlock(
    id: number,
    blockUpdate: BlockUpdate,
  ): Block | Promise<Block> | Observable<Block> {
    return this.repository.update(id, blockUpdate);
  }
}
