import { Module } from '@nestjs/common';

import { TrpcRouter } from './trpc.router';
import { TrpcCoreModule } from './trpc-core.module';
import { UserModule } from '../../modules/user/user.module';
import { SpaceModule } from '../../modules/space/space.module';
import { NoteModule } from '../../modules/note/note.module';

@Module({
  imports: [TrpcCoreModule, UserModule, SpaceModule, NoteModule],
  providers: [TrpcRouter],
})
export class TrpcModule {}
