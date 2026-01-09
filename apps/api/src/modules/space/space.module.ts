import { Module } from '@nestjs/common';
import { SpaceRepository } from '@repo/domain';

import { SpaceTrpcRouter } from './space.trpc';
import { SpaceService } from './space.service';
import { SpaceRepositoryRemote } from './repositories/space.repository.remote';
import { SpaceRepositoryMock } from './repositories/space.repository.mock';
import { getRepositoryImplementation } from '../../common/repository-factory';

@Module({
  providers: [
    SpaceTrpcRouter,
    SpaceService,
    {
      provide: SpaceRepository,
      useClass: getRepositoryImplementation<SpaceRepository>(SpaceRepositoryRemote, SpaceRepositoryMock),
    },
  ],
  exports: [SpaceService, SpaceTrpcRouter],
})
export class SpaceModule {}
