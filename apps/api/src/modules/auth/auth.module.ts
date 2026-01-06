import { Module, Global } from '@nestjs/common';
import { AuthRepository } from '@repo/domain';

import { AuthService } from './auth.service';
import { AuthTrpcRouter } from './auth.trpc';
import { AuthRepositoryRemote } from './repositories/auth.repository.remote';

@Global()
@Module({
  providers: [
    AuthService,
    AuthTrpcRouter,
    {
      provide: AuthRepository,
      useClass: AuthRepositoryRemote,
    },
  ],
  exports: [AuthService, AuthTrpcRouter, AuthRepository],
})
export class AuthModule {}
