import { Injectable } from '@nestjs/common';
import typia from 'typia';
import { uuidv7 } from 'uuidv7';

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
  id: string;
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
            return {
              id: uuidv7(),
              ...input,
            };
          }),

        show: this.trpcService.procedure
          .input(validateShow)
          .query(({ input }) => {
            return {
              id: input.id,
              name: `John Doe ${input.id}`,
              email: 'john@doe.com',
              login: 'johndoe',
            };
          }),

        list: this.trpcService.procedure
          .input(validateMeta)
          .query(({ input }) => {
            const pages: Record<number, TUsers> = {
              1: [
                { id: uuidv7(), name: `John Doe 1`, email: 'john1@doe.com', login: 'johndoe1' },
                { id: uuidv7(), name: `John Doe 2`, email: 'john2@doe.com', login: 'johndoe2' },
                { id: uuidv7(), name: `John Doe 3`, email: 'john3@doe.com', login: 'johndoe3' },
              ],
              2: [
                { id: uuidv7(), name: `John Doe 4`, email: 'john4@doe.com', login: 'johndoe4' },
                { id: uuidv7(), name: `John Doe 5`, email: 'john5@doe.com', login: 'johndoe5' },
                { id: uuidv7(), name: `John Doe 6`, email: 'john6@doe.com', login: 'johndoe6' },
              ],
            };
            return pages[input.page] || [];
          }),
      }),
    };
  }
}
