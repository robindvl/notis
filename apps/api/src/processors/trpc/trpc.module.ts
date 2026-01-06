import { Module } from '@nestjs/common';

import { TrpcRouter } from './trpc.router';
import { TrpcCoreModule } from './trpc-core.module';
import { UserModule } from '../../modules/user/user.module';
import { SpaceModule } from '../../modules/space/space.module';
import { NoteModule } from '../../modules/note/note.module';
import { ProjectModule } from '../../modules/project/project.module';
import { TaskModule } from '../../modules/task/task.module';

@Module({
  imports: [TrpcCoreModule, UserModule, SpaceModule, NoteModule, ProjectModule, TaskModule],
  providers: [TrpcRouter],
})
export class TrpcModule {}
