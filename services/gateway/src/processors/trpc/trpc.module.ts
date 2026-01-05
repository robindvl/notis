import { Module } from '@nestjs/common';

import { TrpcRouter } from './trpc.router';
import { TrpcCoreModule } from './trpc-core.module';
import { UserModule } from '../../modules/user/user.module';
import { SpaceModule } from '../../modules/space/space.module';
import { SectionModule } from '../../modules/section/section.module';
import { NoteModule } from '../../modules/note/note.module';

@Module({
  imports: [TrpcCoreModule, UserModule, SpaceModule, SectionModule, NoteModule],
  providers: [TrpcRouter],
})
export class TrpcModule {}
