import { Module } from '@nestjs/common';

import { UserTrpcRouter } from './user.trpc';
import { TrpcService } from '../../processors/trpc/trpc.service';

@Module({
  providers: [UserTrpcRouter, TrpcService],
})
export class UserModule {}
