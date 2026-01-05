import { Injectable } from '@nestjs/common';
import { faker } from '@faker-js/faker/locale/ru';
import { uuidv7 } from 'uuidv7';
import typia from 'typia';

import { TrpcService } from '../../processors/trpc/trpc.service';
import { BaseRouter } from '../../common/base-router';
import { TSection, TSections } from './section.types';

const sections = [
  {
    id: uuidv7(),
    name: 'Документация',
    space_id: uuidv7(),
    notes: [
      {
        id: uuidv7(),
        name: faker.lorem.paragraph(),
        emoji: faker.internet.emoji(),
      },
      {
        id: uuidv7(),
        name: faker.lorem.paragraph(),
        emoji: faker.internet.emoji(),
      },
      {
        id: uuidv7(),
        name: faker.lorem.paragraph(),
        emoji: faker.internet.emoji(),
      },
      {
        id: uuidv7(),
        name: faker.lorem.paragraph(),
        emoji: faker.internet.emoji(),
      },
      {
        id: uuidv7(),
        name: faker.lorem.paragraph(),
        emoji: faker.internet.emoji(),
      },
    ],
  },
  { id: uuidv7(), space_id: uuidv7(), name: 'База данных', notes: [] },
  { id: uuidv7(), space_id: uuidv7(), name: 'Финансы', notes: [] },
] satisfies TSections;

const validateCreate = typia.createAssert<{ name: string }>();

@Injectable()
export class SectionTrpcRouter extends BaseRouter {
  routes;

  constructor(private readonly trpcService: TrpcService) {
    super();

    this.routes = {
      sections: this.trpcService.router({
        create: this.create(),
        list: this.list(),
      }),
    };
  }

  create() {
    return this.trpcService.procedure
      .input(validateCreate)
      .mutation(() => {
        const item = {
          id: uuidv7(),
          name: faker.book.title(),
          notes: [],
          space_id: uuidv7(),
        } satisfies TSection;
        sections.push(item);
        return item;
      });
  }

  list() {
    return this.trpcService.procedure.query(() => {
      return sections;
    });
  }
}
