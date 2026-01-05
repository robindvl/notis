import { Injectable } from '@nestjs/common';
import typia from 'typia';

import { UserCreateSchema } from './user.validate';
import { TrpcService } from '../../processors/trpc/trpc.service';
import { BaseRouter } from '../../common/base-router';
import type { TUsers } from './user.types';

type TMeta = {
  page: number;
  size: number;
};

const validateMeta = typia.createAssert<TMeta>();
const validateShow = typia.createAssert<{
  id: number;
  name?: string;
}>();

@Injectable()
export class UserTrpcRouter extends BaseRouter {
  routes;

  constructor(private readonly trpcService: TrpcService) {
    super();

    this.routes = {
      users: this.trpcService.router({
        create: this.trpcService.procedure
          .input(UserCreateSchema)
          .mutation(({ input }) => {
            return input;
          }),

        show: this.trpcService.procedure
          .input(validateShow)
          .query(({ input }) => {
            return { id: input.id, name: `John Doe ${input.id}` };
          }),

        list: this.trpcService.procedure
          .input(validateMeta)
          .query(({ input }) => {
            const pages: Record<number, TUsers> = {
              1: [
                { id: 1, name: `John Doe 1` },
                { id: 2, name: `John Doe 2` },
                { id: 3, name: `John Doe 3` },
              ],
              2: [
                { id: 4, name: `John Doe 4` },
                { id: 5, name: `John Doe 5` },
                { id: 6, name: `John Doe 6` },
              ],
            };
            return pages[input.page];
          }),
      }),
    };
  }
}
