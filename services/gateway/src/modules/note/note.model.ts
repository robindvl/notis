import { Module } from '@nestjs/common';

import { NoteTrpcRouter } from './note.trpc';
import { TrpcService } from '../../processors/trpc/trpc.service';

@Module({
  providers: [NoteTrpcRouter, TrpcService],
  exports: [NoteTrpcRouter],
})
export class NoteModule {}

