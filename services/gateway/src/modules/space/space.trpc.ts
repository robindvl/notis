import { Injectable } from '@nestjs/common';
import typia from 'typia';

import { TrpcService } from '../../processors/trpc/trpc.service';
import { BaseRouter } from '../../common/base-router';
import { SpaceService } from './space.service';

const validateShow = typia.createAssert<{ id: string }>();

@Injectable()
export class SpaceTrpcRouter extends BaseRouter {
  routes;

  constructor(
    private readonly trpcService: TrpcService,
    private readonly spaceService: SpaceService,
  ) {
    super();

    this.routes = {
      spaces: this.trpcService.router({
        show: this.show(),
        list: this.list(),
      }),
    };
  }

  show() {
    return this.trpcService.procedure
      .input(validateShow)
      .query(async ({ input: { id } }) => {
        return this.spaceService.findById(id);
      });
  }

  list() {
    return this.trpcService.procedure.query(async () => {
      return this.spaceService.list();
    });
  }
}
