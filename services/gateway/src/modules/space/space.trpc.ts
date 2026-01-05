import { Injectable } from '@nestjs/common';
import typia from 'typia';
import { faker } from '@faker-js/faker/locale/ru';
import { uuidv7 } from 'uuidv7';

import { TrpcService } from '../../processors/trpc/trpc.service';
import { BaseRouter } from '../../common/base-router';
import { TSpace, TSpaces } from './space.types';

const validateShow = typia.createAssert<{ id: string }>();

@Injectable()
export class SpaceTrpcRouter extends BaseRouter {
  routes;

  constructor(private readonly trpcService: TrpcService) {
    super();

    this.routes = {
      spaces: this.trpcService.router({
        show: this.show(),
        list: this.list(),
      }),
    };
  }

  show() {
    return this.trpcService.procedure
      .input(validateShow)
      .query(({ input: { id } }) => {
        return {
          id,
          name: faker.book.format(),
          created_at: String(Math.random()),
          img: faker.image.avatar(),
        } satisfies TSpace;
      });
  }

  list() {
    return this.trpcService.procedure.query(() => {
      return [
        {
          id: uuidv7(),
          name: faker.book.format(),
          img: faker.image.avatar(),
          created_at: String(Math.random()),
        },
        {
          id: uuidv7(),
          name: faker.book.format(),
          img: faker.image.avatar(),
          created_at: String(Math.random()),
        },
        {
          id: uuidv7(),
          name: faker.book.format(),
          img: faker.image.avatar(),
          created_at: String(Math.random()),
        },
      ] satisfies TSpaces;
    });
  }
}
