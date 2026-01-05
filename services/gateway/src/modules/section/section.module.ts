import { Module } from '@nestjs/common';
import { SectionRepository } from '@repo/domain';

import { SectionTrpcRouter } from './section.trpc';
import { SectionService } from './section.service';
import { SectionRepositoryMock } from './repositories/section.repository.mock';

@Module({
  providers: [
    SectionTrpcRouter,
    SectionService,
    {
      provide: SectionRepository,
      useClass: SectionRepositoryMock,
    },
  ],
  exports: [SectionService, SectionTrpcRouter],
})
export class SectionModule {}
