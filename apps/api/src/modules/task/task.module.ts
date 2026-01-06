import { Module } from '@nestjs/common';
import { TaskRepository } from '@repo/domain';

import { TaskTrpcRouter } from './task.trpc';
import { TaskService } from './task.service';
import { TaskRepositoryMock } from './repositories/tack.repository.mock';

@Module({
  providers: [
    TaskTrpcRouter,
    TaskService,
    {
      provide: TaskRepository,
      useClass: TaskRepositoryMock,
    },
  ],
  exports: [TaskService, TaskTrpcRouter],
})
export class TaskModule {}
