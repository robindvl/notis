import { Module } from '@nestjs/common';
import { UserRepository } from '@repo/domain';

import { UserTrpcRouter } from './user.trpc';
import { UserService } from './user.service';
import { UserRepositoryRemote } from './repositories/user.repository.remote';

@Module({
  providers: [
    UserTrpcRouter,
    UserService,
    {
      provide: UserRepository,
      useClass: UserRepositoryRemote,
    },
  ],
  exports: [UserService, UserTrpcRouter],
})
export class UserModule {}
