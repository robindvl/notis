import { Module } from '@nestjs/common';
import { UserRepository } from '@repo/domain';

import { UserTrpcRouter } from './user.trpc';
import { UserService } from './user.service';
import { UserRepositoryMock } from './repositories/user.repository.mock';

@Module({
  providers: [
    UserTrpcRouter,
    UserService,
    {
      provide: UserRepository,
      useClass: UserRepositoryMock,
    },
  ],
  exports: [UserService, UserTrpcRouter],
})
export class UserModule {}
