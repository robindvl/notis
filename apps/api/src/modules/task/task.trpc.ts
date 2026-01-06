import { Injectable } from '@nestjs/common';
import typia from 'typia';

import { TrpcService } from '../../processors/trpc/trpc.service';
import { BaseRouter } from '../../common/base-router';
import { 
  Task, 
  CreateTaskDto, 
  UpdateTaskDto,
  IdDto,
  AttrMetaDto
} from '@repo/domain';
import { TaskService } from './task.service';

const validateList = typia.createAssert<{ projectId: string } & AttrMetaDto<Task>>();
const validateShow = typia.createAssert<IdDto & AttrMetaDto<Task>>();
const validateCreate = typia.createAssert<CreateTaskDto>();
const validateUpdate = typia.createAssert<IdDto & UpdateTaskDto>();

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
