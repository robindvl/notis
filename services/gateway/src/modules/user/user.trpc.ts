import { Injectable } from '@nestjs/common';
import typia from 'typia';

import { UserCreateSchema } from './user.validate';
import { TrpcService } from '../../processors/trpc/trpc.service';
import { BaseRouter } from '../../common/base-router';
import { UserService } from './user.service';

type TMeta = {
  page: number;
  size: number;
};

const validateMeta = typia.createAssert<TMeta>();
const validateShow = typia.createAssert<{
  id: string;
  name?: string;
}>();

@Injectable()
export class UserTrpcRouter extends BaseRouter {
  routes;

  constructor(
    private readonly trpcService: TrpcService,
    private readonly userService: UserService,
  ) {
    super();

    this.routes = {
      users: this.trpcService.router({
        create: this.trpcService.procedure
          .input(UserCreateSchema)
          .mutation(async ({ input }) => {
            return this.userService.create(input);
          }),

        show: this.trpcService.procedure
          .input(validateShow)
          .query(async ({ input }) => {
            return this.userService.findById(input.id);
          }),

        list: this.trpcService.procedure
          .input(validateMeta)
          .query(async ({ input }) => {
            return this.userService.list(input.page, input.size);
          }),
      }),
    };
  }
}
