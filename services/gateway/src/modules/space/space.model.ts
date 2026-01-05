import { Global, Module } from '@nestjs/common';

import { SpaceTrpcRouter } from './space.trpc';
import { TrpcService } from '../../processors/trpc/trpc.service';

@Module({
  providers: [SpaceTrpcRouter, TrpcService],
})
export class SpaceModule {}
