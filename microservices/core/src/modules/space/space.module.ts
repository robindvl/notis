import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpaceRepository } from '@repo/domain';
import { SpaceRepositoryTypeOrm } from './repositories/space.repository.typeorm';
import { SpaceService } from './space.service';
import { SpaceEntity } from './entities/space.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SpaceEntity])],
  providers: [
    SpaceService,
    {
      provide: SpaceRepository,
      useClass: SpaceRepositoryTypeOrm,
    },
  ],
  exports: [SpaceService, SpaceRepository],
})
export class SpaceModule {}
