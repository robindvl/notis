import { Module } from '@nestjs/common';
import { UserRepository } from '@repo/domain';

import { UserTrpcRouter } from './user.trpc';
import { UserService } from './user.service';
import { UserRepositoryRemote } from './repositories/user.repository.remote';
import { UserRepositoryMock } from './repositories/user.repository.mock';
import { getRepositoryImplementation } from '../../common/repository-factory';

@Module({
  providers: [
    UserTrpcRouter,
    UserService,
    {
      provide: UserRepository,
      useClass: getRepositoryImplementation<UserRepository>(UserRepositoryRemote, UserRepositoryMock),
    },
  ],
  exports: [UserService, UserTrpcRouter],
})
export class UserModule {}
