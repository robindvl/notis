import { Module } from '@nestjs/common';

import { BlocksMockRepository } from './repositories/block.mock';
import { BlockRepository } from './repositories/block.abstract';

@Module({
  providers: [
    {
      provide: BlockRepository,
      useClass: BlocksMockRepository,
    },
  ],
  exports: [BlockRepository],
})
export class BlocksModule {}
