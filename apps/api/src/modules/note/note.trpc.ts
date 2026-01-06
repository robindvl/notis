import { Injectable } from '@nestjs/common';
import typia from 'typia';

import { TrpcService } from '../../processors/trpc/trpc.service';
import { BaseRouter } from '../../common/base-router';
import { NoteService } from './note.service';
import { TNote } from './note.types';
import type { KeysArray } from '../../common/flattened.types';

type TMeta = {
  attr?: KeysArray<TNote>;
};

const validateList = typia.createAssert<{ spaceId: string } & TMeta>();
const validateShow = typia.createAssert<{ id: string } & TMeta>();

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
    return this.trpcService.protectedProcedure.input(validateList).query(async ({ input, ctx }) => {
      // ctx.user contains the validated user info
      return this.noteService.list(input.spaceId);
    });
  }
}

