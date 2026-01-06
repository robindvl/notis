import { Injectable } from '@nestjs/common';
import typia from 'typia';
import type { LoginDto, RegisterDto } from '@repo/domain';

import { TrpcService } from '../../processors/trpc/trpc.service';
import { BaseRouter } from '../../common/base-router';
import { AuthService } from './auth.service';

const validateLogin = typia.createAssert<LoginDto>();
const validateRegister = typia.createAssert<RegisterDto>();

@Injectable()
export class AuthTrpcRouter extends BaseRouter {
  routes;

  constructor(
    private readonly trpcService: TrpcService,
    private readonly authService: AuthService,
  ) {
    super();

    this.routes = {
      auth: this.trpcService.router({
        login: this.login(),
        register: this.register(),
      }),
    };
  }

  login() {
    return this.trpcService.procedure
      .input(validateLogin)
      .mutation(async ({ input }) => {
        return this.authService.login(input);
      });
  }

  register() {
    return this.trpcService.procedure
      .input(validateRegister)
      .mutation(async ({ input }) => {
        return this.authService.register(input);
      });
  }
}
