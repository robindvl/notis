import { Module } from '@nestjs/common';

import { TrpcRouter } from './trpc.router';
import { TrpcService } from './trpc.service';
import { UserTrpcRouter } from '../../modules/user/user.trpc';
import { SpaceTrpcRouter } from '../../modules/space/space.trpc';
import { SectionTrpcRouter } from '../../modules/section/section.trpc';
import { BlockTrpcRouter } from '../../modules/block/block.trpc';

@Module({
  providers: [
    TrpcService,
    TrpcRouter,
    UserTrpcRouter,
    SpaceTrpcRouter,
    SectionTrpcRouter,
    BlockTrpcRouter,
  ],
})
export class TrpcModule {}
