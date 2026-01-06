import { Injectable } from '@nestjs/common';
import typia from 'typia';

import { TrpcService } from '../../processors/trpc/trpc.service';
import { BaseRouter } from '../../common/base-router';
import { TaskService } from './task.service';
import { TTask } from './task.types';
import type { KeysArray } from '../../common/flattened.types';

type TMeta = {
  attr?: KeysArray<TTask>;
};

const validateList = typia.createAssert<{ projectId: string } & TMeta>();
const validateShow = typia.createAssert<{ id: string } & TMeta>();

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
}

