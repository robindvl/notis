import { Injectable } from '@nestjs/common';
import { faker } from '@faker-js/faker/locale/ru';
import { uuidv7 } from 'uuidv7';
import typia from 'typia';

import { TrpcService } from '../../processors/trpc/trpc.service';
import { BaseRouter } from '../../common/base-router';
import { TPage, TPages } from './page.types';
import type { KeysArray } from '../../common/flattened.types';

const pages = [
  {
    id: uuidv7(),
    name: faker.lorem.paragraph(),
    emoji: faker.internet.emoji(),
    section: {
      id: uuidv7(),
      name: 'name',
      pages: [],
      space_id: uuidv7(),
    },
  },
  {
    id: uuidv7(),
    name: faker.lorem.paragraph(),
    emoji: faker.internet.emoji(),
    section: {
      id: uuidv7(),
      name: 'name',
      pages: [],
      space_id: uuidv7(),
    },
  },
  {
    id: uuidv7(),
    name: faker.lorem.paragraph(),
    emoji: faker.internet.emoji(),
    section: {
      id: uuidv7(),
      name: 'name',
      pages: [],
      space_id: uuidv7(),
    },
  },
] satisfies TPages;

type TMeta = {
  attr?: KeysArray<TPage>;
};

const validateList = typia.createAssert<TMeta>();
const validateShow = typia.createAssert<{ id: string } & TMeta>();

@Injectable()
export class PageTrpcRouter extends BaseRouter {
  routes;

  constructor(private readonly trpcService: TrpcService) {
    super();

    this.routes = {
      pages: this.trpcService.router({
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
          section: {
            id: uuidv7(),
            name: 'name',
            pages: [],
            space_id: uuidv7(),
          },
        } satisfies TPage;
      });
  }

  list() {
    return this.trpcService.procedure.input(validateList).query(() => {
      return pages;
    });
  }
}
