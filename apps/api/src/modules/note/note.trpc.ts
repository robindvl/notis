// notes.trpc.ts
import { Injectable } from '@nestjs/common';
import typia from 'typia';

import { TrpcService } from '../../processors/trpc/trpc.service';
import { BaseRouter } from '../../common/base-router';
import { NoteService } from './note.service';
import { Note, AttrMetaDto, NoteCreateDto } from '@repo/domain';

/**
 * @format uuid
 */
type UUID = string;

const validateList = typia.createAssert<{ spaceId: UUID } & AttrMetaDto<Note>>();
const validateShow = typia.createAssert<{ id: UUID } & AttrMetaDto<Note>>();
const validateUpdate = typia.createAssert<{ id: UUID; data: { title?: string; body?: string } } & AttrMetaDto<Note>>();

// Используйте NoteCreateDto напрямую или создайте правильный тип
const validateCreate = typia.createAssert<NoteCreateDto & AttrMetaDto<Note>>();

// ИЛИ явно определите тип:
// const validateCreate = typia.createAssert<{
//   spaceId: UUID;
//   title: string;
//   type: 'note' | 'section'; // делаем type обязательным
//   emoji?: string;
//   sectionId?: UUID;
//   parentId?: UUID;
//   body?: string;
// } & AttrMetaDto<Note>>();

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
        create: this.create(),
        update: this.update(),
      }),
    };
  }

  create() {
    return this.trpcService.protectedProcedure
        .input(validateCreate)
        .mutation(async ({ input }) => {
          // Убедитесь, что type задан по умолчанию если не передан
          const createData = {
            ...input,
            type: input.type || 'note', // или используйте значение по умолчанию
          };
          return this.noteService.createNote(createData);
        });
  }

  update() {
    return this.trpcService.protectedProcedure
        .input(validateUpdate)
        .mutation(async ({ input: { id, data } }) => {
          return this.noteService.updateNote(id, data);
        });
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
