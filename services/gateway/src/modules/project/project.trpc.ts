import { Injectable } from '@nestjs/common';
import typia from 'typia';

import { TrpcService } from '../../processors/trpc/trpc.service';
import { BaseRouter } from '../../common/base-router';
import { ProjectService } from './project.service';
import { TProject } from './project.types';
import type { KeysArray } from '../../common/flattened.types';

type TMeta = {
  attr?: KeysArray<TProject>;
};

const validateList = typia.createAssert<{ ownerId: string } & TMeta>();
const validateShow = typia.createAssert<{ id: string } & TMeta>();

@Injectable()
export class ProjectTrpcRouter extends BaseRouter {
  routes;

  constructor(
    private readonly trpcService: TrpcService,
    private readonly projectService: ProjectService,
  ) {
    super();

    this.routes = {
      projects: this.trpcService.router({
        list: this.list(),
        show: this.show(),
      }),
    };
  }

  show() {
    return this.trpcService.procedure
      .input(validateShow)
      .query(async ({ input: { id } }) => {
        return this.projectService.findById(id);
      });
  }

  list() {
    return this.trpcService.procedure.input(validateList).query(async ({ input }) => {
      return this.projectService.list(input.ownerId);
    });
  }
}

