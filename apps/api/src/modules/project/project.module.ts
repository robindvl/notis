import { Module } from '@nestjs/common';
import { ProjectRepository } from '@repo/domain';

import { ProjectTrpcRouter } from './project.trpc';
import { ProjectService } from './project.service';
import { ProjectRepositoryMock } from './repositories/project.repository.mock';

@Module({
  providers: [
    ProjectTrpcRouter,
    ProjectService,
    {
      provide: ProjectRepository,
      useClass: ProjectRepositoryMock,
    },
  ],
  exports: [ProjectService, ProjectTrpcRouter],
})
export class ProjectModule {}
