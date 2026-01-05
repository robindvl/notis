import { Injectable } from '@nestjs/common';
import { faker } from '@faker-js/faker/locale/ru';
import { uuidv7 } from 'uuidv7';
import typia from 'typia';

import { TrpcService } from '../../processors/trpc/trpc.service';
import { BaseRouter } from '../../common/base-router';
import { TBlock, TBlocks } from './block.types';
import type { KeysArray } from '../../common/flattened.types';

const blocks = [
  {
    id: Math.random(),
    uuid: uuidv7(),
    name: faker.lorem.paragraph(),
    emoji: faker.internet.emoji(),
    type: 'page',
    section: {
      id: Math.random(),
      name: 'name',
      blocks: [],
      space_id: 1,
    },
  },
  {
    id: Math.random(),
    uuid: uuidv7(),
    name: faker.lorem.paragraph(),
    emoji: faker.internet.emoji(),
    type: 'page',
    section: {
      id: Math.random(),
      name: 'name',
      blocks: [],
      space_id: 1,
    },
  },
  {
    id: Math.random(),
    uuid: uuidv7(),
    name: faker.lorem.paragraph(),
    emoji: faker.internet.emoji(),
    type: 'page',
    section: {
      id: Math.random(),
      name: 'name',
      blocks: [],
      space_id: 1,
    },
  },
  {
    id: Math.random(),
    uuid: uuidv7(),
    name: faker.lorem.paragraph(),
    emoji: faker.internet.emoji(),
    type: 'page',
    section: {
      id: Math.random(),
      name: 'name',
      blocks: [],
      space_id: 1,
    },
  },
  {
    id: Math.random(),
    uuid: uuidv7(),
    name: faker.lorem.paragraph(),
    emoji: faker.internet.emoji(),
    type: 'page',
    section: {
      id: Math.random(),
      name: 'name',
      blocks: [],
      space_id: 1,
    },
  },
] satisfies TBlocks;

type TMeta = {
  attr?: KeysArray<TBlock>;
};

const validateList = typia.createAssert<TMeta>();
const validateShow = typia.createAssert<{ uuid: string } & TMeta>();

@Injectable()
export class BlockTrpcRouter extends BaseRouter {
  routes;

  constructor(private readonly trpcService: TrpcService) {
    super();

    this.routes = {
      blocks: this.trpcService.router({
        list: this.list(),
        show: this.show(),
      }),
    };
  }

  show() {
    return this.trpcService.procedure
      .input(validateShow)
      .query(({ input: { uuid } }) => {
        return {
          id: Math.random(),
          uuid: uuid,
          name: faker.lorem.paragraph(),
          emoji: faker.internet.emoji(),
          type: 'page',
          section: {
            id: Math.random(),
            name: 'name',
            blocks: [],
            space_id: 1,
          },
        } satisfies TBlock;
      });
  }

  list() {
    return this.trpcService.procedure.input(validateList).query(() => {
      return blocks;
    });
  }
}
