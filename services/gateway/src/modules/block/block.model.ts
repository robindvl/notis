import { Global, Module } from '@nestjs/common';

import { BlockTrpcRouter } from './block.trpc';
import { TrpcService } from '../../processors/trpc/trpc.service';

@Module({
  providers: [BlockTrpcRouter, TrpcService],
})
export class BlockModule {}
