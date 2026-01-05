import { Global, Module } from '@nestjs/common';

import { SectionTrpcRouter } from './section.trpc';
import { TrpcService } from '../../processors/trpc/trpc.service';

@Module({
  providers: [SectionTrpcRouter, TrpcService],
})
export class SectionModule {}
