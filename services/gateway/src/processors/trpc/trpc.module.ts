import { Module } from '@nestjs/common';

import { TrpcRouter } from './trpc.router';
import { TrpcService } from './trpc.service';
import { UserTrpcRouter } from '../../modules/user/user.trpc';
import { SpaceTrpcRouter } from '../../modules/space/space.trpc';
import { SectionTrpcRouter } from '../../modules/section/section.trpc';
import { PageTrpcRouter } from '../../modules/page/page.trpc';

@Module({
  providers: [
    TrpcService,
    TrpcRouter,
    UserTrpcRouter,
    SpaceTrpcRouter,
    SectionTrpcRouter,
    PageTrpcRouter,
  ],
})
export class TrpcModule {}
