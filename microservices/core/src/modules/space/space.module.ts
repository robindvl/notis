import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SpaceRepository } from '@repo/domain';
import { SpaceRepositoryTypeOrm } from './repositories/space.repository.typeorm';
import { SpaceService } from './space.service';
import { SpaceEntity } from './entities/space.entity';
import { SpacePolicy } from './space.policy';
import { CreateSpaceUseCase } from './use-cases/create-space.use-case';
import { UpdateSpaceUseCase } from './use-cases/update-space.use-case';
import { GetSpaceUseCase } from './use-cases/get-space.use-case';
import { DeleteSpaceUseCase } from './use-cases/delete-space.use-case';
import { GetSpacesUseCase } from './use-cases/get-spaces.use-case';

const UseCases = [
  CreateSpaceUseCase,
  UpdateSpaceUseCase,
  GetSpaceUseCase,
  DeleteSpaceUseCase,
  GetSpacesUseCase,
];

@Module({
  imports: [TypeOrmModule.forFeature([SpaceEntity])],
  providers: [
    SpaceService,
    SpacePolicy,
    ...UseCases,
    {
      provide: SpaceRepository,
      useClass: SpaceRepositoryTypeOrm,
    },
  ],
  exports: [SpaceService, SpaceRepository, SpacePolicy, ...UseCases],
})
export class SpaceModule {}
