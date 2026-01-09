import { Module, Global } from '@nestjs/common';
import { AuthRepository } from '@repo/domain';

import { AuthService } from './auth.service';
import { AuthTrpcRouter } from './auth.trpc';
import { AuthRepositoryRemote } from './repositories/auth.repository.remote';
import { AuthRepositoryMock } from './repositories/auth.repository.mock';
import { getRepositoryImplementation } from '../../common/repository-factory';

@Global()
@Module({
  providers: [
    AuthService,
    AuthTrpcRouter,
    {
      provide: AuthRepository,
      useClass: getRepositoryImplementation<AuthRepository>(AuthRepositoryRemote, AuthRepositoryMock),
    },
  ],
  exports: [AuthService, AuthTrpcRouter, AuthRepository],
})
export class AuthModule {}
