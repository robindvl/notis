import { Injectable } from '@nestjs/common';
import typia from 'typia';

import { TrpcService } from '../../processors/trpc/trpc.service';
import { BaseRouter } from '../../common/base-router';
import { SectionService } from './section.service';

const validateCreate = typia.createAssert<{ name: string }>();

@Injectable()
export class SectionTrpcRouter extends BaseRouter {
  routes;

  constructor(
    private readonly trpcService: TrpcService,
    private readonly sectionService: SectionService,
  ) {
    super();

    this.routes = {
      sections: this.trpcService.router({
        create: this.create(),
        list: this.list(),
      }),
    };
  }

  create() {
    return this.trpcService.procedure
      .input(validateCreate)
      .mutation(async ({ input }) => {
        return this.sectionService.create(input.name);
      });
  }

  list() {
    return this.trpcService.procedure.query(async () => {
      return this.sectionService.list();
    });
  }
}
