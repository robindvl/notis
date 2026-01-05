import { Injectable } from '@nestjs/common';
import { faker } from '@faker-js/faker/locale/ru';
import { uuidv7 } from 'uuidv7';
import typia from 'typia';

import { TrpcService } from '../../processors/trpc/trpc.service';
import { BaseRouter } from '../../common/base-router';
import { TNote, TNotes } from './note.types';
import type { KeysArray } from '../../common/flattened.types';

const notes = [
  {
    id: uuidv7(),
    name: faker.lorem.paragraph(),
    emoji: faker.internet.emoji(),
    type: 'note',
    spaceId: uuidv7(),
    createdAt: new Date(),
    updatedAt: new Date(),
    section: {
      id: uuidv7(),
      name: 'name',
      notes: [],
      space_id: uuidv7(),
    },
  },
  {
    id: uuidv7(),
    name: faker.lorem.paragraph(),
    emoji: faker.internet.emoji(),
    type: 'note',
    spaceId: uuidv7(),
    createdAt: new Date(),
    updatedAt: new Date(),
    section: {
      id: uuidv7(),
      name: 'name',
      notes: [],
      space_id: uuidv7(),
    },
  },
  {
    id: uuidv7(),
    name: faker.lorem.paragraph(),
    emoji: faker.internet.emoji(),
    type: 'note',
    spaceId: uuidv7(),
    createdAt: new Date(),
    updatedAt: new Date(),
    section: {
      id: uuidv7(),
      name: 'name',
      notes: [],
      space_id: uuidv7(),
    },
  },
] satisfies TNotes;

type TMeta = {
  attr?: KeysArray<TNote>;
};

const validateList = typia.createAssert<TMeta>();
const validateShow = typia.createAssert<{ id: string } & TMeta>();

@Injectable()
export class NoteTrpcRouter extends BaseRouter {
  routes;

  constructor(private readonly trpcService: TrpcService) {
    super();

    this.routes = {
      notes: this.trpcService.router({
        list: this.list(),
        show: this.show(),
      }),
    };
  }

  show() {
    return this.trpcService.procedure
      .input(validateShow)
      .query(({ input: { id } }) => {
        return {
          id: id,
          name: faker.lorem.paragraph(),
          emoji: faker.internet.emoji(),
          type: 'note',
          spaceId: uuidv7(),
          createdAt: new Date(),
          updatedAt: new Date(),
          section: {
            id: uuidv7(),
            name: 'name',
            notes: [],
            space_id: uuidv7(),
          },
        } satisfies TNote;
      });
  }

  list() {
    return this.trpcService.procedure.input(validateList).query(() => {
      return notes;
    });
  }
}

