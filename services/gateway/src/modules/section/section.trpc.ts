import { Injectable } from '@nestjs/common';
import { faker } from '@faker-js/faker/locale/ru';
import { type } from 'arktype';

import { TrpcService } from '../../processors/trpc/trpc.service';
import { BaseRouter } from '../../common/base-router';
import { TSection, TSections } from './section.types';

const sections = [
  {
    id: 1,
    name: 'Документация',
    space_id: 1,
    pages: [
      {
        id: Math.random(),
        name: faker.lorem.paragraph(),
        emoji: faker.internet.emoji(),
      },
      {
        id: Math.random(),
        name: faker.lorem.paragraph(),
        emoji: faker.internet.emoji(),
      },
      {
        id: Math.random(),
        name: faker.lorem.paragraph(),
        emoji: faker.internet.emoji(),
      },
      {
        id: Math.random(),
        name: faker.lorem.paragraph(),
        emoji: faker.internet.emoji(),
      },
      {
        id: Math.random(),
        name: faker.lorem.paragraph(),
        emoji: faker.internet.emoji(),
      },
    ],
  },
  { id: Math.random(), space_id: 1, name: 'База данных', pages: [] },
  { id: Math.random(), space_id: 1, name: 'Финансы', pages: [] },
] satisfies TSections;

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
      .input(
        type({
          name: 'string',
        }),
      )
      .mutation(() => {
        const item = {
          id: Math.random(),
          name: faker.book.title(),
          pages: [],
          space_id: 1,
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
