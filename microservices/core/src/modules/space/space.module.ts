import { Module } from '@nestjs/common';
import { SpaceRepository } from '@repo/domain';
import { SpaceRepositoryMock } from './repositories/space.repository.mock';
import { SpaceService } from './space.service';

@Module({
  providers: [
    SpaceService,
    {
      provide: SpaceRepository,
      useClass: SpaceRepositoryMock,
    },
  ],
  exports: [SpaceService, SpaceRepository],
})
export class SpaceModule {}
