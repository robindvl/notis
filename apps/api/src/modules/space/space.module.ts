import { Module } from '@nestjs/common';
import { SpaceRepository } from '@repo/domain';

import { SpaceTrpcRouter } from './space.trpc';
import { SpaceService } from './space.service';
import { SpaceRepositoryRemote } from './repositories/space.repository.remote';

@Module({
  providers: [
    SpaceTrpcRouter,
    SpaceService,
    {
      provide: SpaceRepository,
      useClass: SpaceRepositoryRemote,
    },
  ],
  exports: [SpaceService, SpaceTrpcRouter],
})
export class SpaceModule {}
