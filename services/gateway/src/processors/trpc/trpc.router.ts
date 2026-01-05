import { Injectable } from '@nestjs/common';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { fastifyRequestHandler } from '@trpc/server/adapters/fastify';
// import * as trpcExpress from '@trpc/server/adapters/express';

import { TrpcService } from './trpc.service';
import { UserTrpcRouter } from '../../modules/user/user.trpc';
import { SpaceTrpcRouter } from '../../modules/space/space.trpc';
import { SectionTrpcRouter } from '../../modules/section/section.trpc';
import { PageTrpcRouter } from '../../modules/page/page.trpc';

@Injectable()
export class TrpcRouter {
  appRouter;

  constructor(
    private readonly trpc: TrpcService,
    private readonly userRouter: UserTrpcRouter,
    private readonly spaceRouter: SpaceTrpcRouter,
    private readonly sectionRouter: SectionTrpcRouter,
    private readonly pageRouter: PageTrpcRouter,
  ) {
    this.appRouter = this.trpc.router({
      ...this.userRouter.routes,
      ...this.spaceRouter.routes,
      ...this.sectionRouter.routes,
      ...this.pageRouter.routes,
    });
  }

  // **Express**
  // async applyMiddleware(app: INestApplication) {
  //   app.use(
  //     `/trpc`,
  //     trpcExpress.createExpressMiddleware({ router: this.appRouter }),
  //   );
  // }

  applyMiddleware(_app: NestFastifyApplication) {
    _app.getHttpAdapter().all(`/trpc/:path`, async (req, res) => {
      const path = (req.params as any).path;
      await fastifyRequestHandler({
        router: this.appRouter,
        createContext: undefined,
        req,
        res,
        path,
      });
    });
  }
}

export type AppRouter = TrpcRouter['appRouter'];
