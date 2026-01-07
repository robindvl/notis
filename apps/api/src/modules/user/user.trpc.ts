import { Injectable } from '@nestjs/common';
import typia from 'typia';
import { CreateUserDto, IdDto, PaginationDto } from '@repo/domain';

import { TrpcService } from '../../processors/trpc/trpc.service';
import { BaseRouter } from '../../common/base-router';
import { UserService } from './user.service';

/**
 * @format uuid
 */
type UUID = string;

const UserCreateSchema = typia.createAssert<CreateUserDto>();
const validateMeta = typia.createAssert<PaginationDto>();
const validateShow = typia.createAssert<{ id: UUID }>();

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
        create: this.create(),
        show: this.show(),
        list: this.list(),
        me: this.me(),
      }),
    };
  }

  create() {
    return this.trpcService.protectedProcedure
      .input(UserCreateSchema)
      .mutation(async ({ input }) => {
        return this.userService.create(input);
      });
  }

  show() {
    return this.trpcService.protectedProcedure
      .input(validateShow)
      .query(async ({ input }) => {
        return this.userService.findById(input.id);
      });
  }

  list() {
    return this.trpcService.protectedProcedure
      .input(validateMeta)
      .query(async ({ input }) => {
        return this.userService.list(input.page, input.size);
      });
  }

  me() {
    return this.trpcService.protectedProcedure
      .query(async ({ ctx }) => {
        return this.userService.findById(ctx.user.userId);
      });
  }
}
