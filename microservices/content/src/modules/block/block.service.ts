import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { BlocksApi } from 'src/@generated/api';
import { Block, BlockCreate, BlockUpdate } from 'src/@generated/models';

@Injectable()
export class BlocksService implements BlocksApi {
  constructor() {}

  blocksGet(): Array<Block> | Promise<Array<Block>> | Observable<Array<Block>> {
    const newId1 = Math.round(Math.random() * 1000);
    const newId2 = Math.round(Math.random() * 1000);
    return [
      { id: newId1, name: `Блок ${newId1}` },
      { id: newId2, name: `Блок ${newId2}` },
    ];
  }

  blocksIdPost(
    id: number,
    blockUpdate: BlockUpdate,
    request: Request,
  ): Block | Promise<Block> | Observable<Block> {
    console.log('Выполняется blocksIdPost', id, request);
    return {
      id: id,
      ...blockUpdate,
    };
  }

  blocksPost(
    blockCreate: BlockCreate,
    request: Request,
  ): Block | Promise<Block> | Observable<Block> {
    console.log('Выполняется blocksPost', blockCreate, request);
    const newId = Math.round(Math.random() * 1000);
    return {
      id: newId,
    };
  }
}
