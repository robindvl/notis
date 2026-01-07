import { Injectable } from '@nestjs/common';
import typia from 'typia';

import { TrpcService } from '../../processors/trpc/trpc.service';
import { BaseRouter } from '../../common/base-router';
import { NoteService } from './note.service';
import { Note, AttrMetaDto, IdDto } from '@repo/domain';

/**
 * @format uuid
 */
type UUID = string;

const validateList = typia.createAssert<{ spaceId: UUID } & AttrMetaDto<Note>>();
const validateShow = typia.createAssert<{ id: UUID } & AttrMetaDto<Note>>();

@Injectable()
export class NoteTrpcRouter extends BaseRouter {
  routes;

  constructor(
    private readonly trpcService: TrpcService,
    private readonly noteService: NoteService,
  ) {
    super();

    this.routes = {
      notes: this.trpcService.router({
        list: this.list(),
        show: this.show(),
      }),
    };
  }

  show() {
    return this.trpcService.protectedProcedure
      .input(validateShow)
      .query(async ({ input: { id } }) => {
        return this.noteService.findById(id);
      });
  }

  list() {
    return this.trpcService.protectedProcedure
    .input(validateList)
    .query(async ({ input }) => {
      return this.noteService.list(input.spaceId);
    });
  }
}
