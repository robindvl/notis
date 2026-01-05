import { Module } from '@nestjs/common';

import { PageTrpcRouter } from './page.trpc';
import { TrpcService } from '../../processors/trpc/trpc.service';

@Module({
  providers: [PageTrpcRouter, TrpcService],
  exports: [PageTrpcRouter],
})
export class PageModule {}
