import { Module, Global } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthTrpcRouter } from './auth.trpc';

@Global()
@Module({
  providers: [AuthService, AuthTrpcRouter],
  exports: [AuthService, AuthTrpcRouter],
})
export class AuthModule {}

