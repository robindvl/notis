import { Block, BlockCreate, BlockUpdate } from '../../../@generated/models';
import { Repository } from '../../../interfaces/repository.abstract';

export abstract class BlockRepository extends Repository<
  Block,
  BlockCreate,
  BlockUpdate
> {}
