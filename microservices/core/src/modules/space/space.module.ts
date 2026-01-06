import { Module } from '@nestjs/common';
import { SpaceRepository } from './repositories/space.abstract';
import { SpacesMockRepository } from './repositories/space.mock';

@Module({
  providers: [
    {
      provide: SpaceRepository,
      useClass: SpacesMockRepository,
    },
  ],
  exports: [SpaceRepository],
})
export class SpacesModule {}
