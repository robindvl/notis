import { Injectable } from '@nestjs/common';
import typia from 'typia';

import { TrpcService } from '../../processors/trpc/trpc.service';
import { BaseRouter } from '../../common/base-router';
import { 
  Task, 
  CreateTaskDto, 
  UpdateTaskDto
} from '@repo/domain';
import { TaskService } from './task.service';
import type { KeysArray } from '../../common/flattened.types';

type TMeta = {
  attr?: KeysArray<Task>;
};

const validateList = typia.createAssert<{ projectId: string } & TMeta>();
const validateShow = typia.createAssert<{ id: string } & TMeta>();
const validateCreate = typia.createAssert<CreateTaskDto>();
const validateUpdate = typia.createAssert<{ id: string } & UpdateTaskDto>();

@Injectable()
export class TaskTrpcRouter extends BaseRouter {
  routes;

  constructor(
    private readonly trpcService: TrpcService,
    private readonly taskService: TaskService,
  ) {
    super();

    this.routes = {
      tasks: this.trpcService.router({
        list: this.list(),
        show: this.show(),
        create: this.create(),
        update: this.update(),
      }),
    };
  }

  show() {
    return this.trpcService.procedure
      .input(validateShow)
      .query(async ({ input: { id } }) => {
        return this.taskService.findById(id);
      });
  }

  list() {
    return this.trpcService.procedure.input(validateList).query(async ({ input }) => {
      return this.taskService.list(input.projectId);
    });
  }

  create() {
    return this.trpcService.procedure.input(validateCreate).mutation(async ({ input }) => {
      return this.taskService.create(input);
    });
  }

  update() {
    return this.trpcService.procedure.input(validateUpdate).mutation(async ({ input }) => {
      const { id, ...dto } = input;
      return this.taskService.update(id, dto);
    });
  }
}

