import { Module } from '@nestjs/common';
import { SpaceRepository } from '@repo/domain';

import { SpaceTrpcRouter } from './space.trpc';
import { SpaceService } from './space.service';
import { SpaceRepositoryMock } from './repositories/space.repository.mock';

@Module({
  providers: [
    SpaceTrpcRouter,
    SpaceService,
    {
      provide: SpaceRepository,
      useClass: SpaceRepositoryMock,
    },
  ],
  exports: [SpaceService, SpaceTrpcRouter],
})
export class SpaceModule {}
