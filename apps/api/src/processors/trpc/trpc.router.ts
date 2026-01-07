import { Injectable } from '@nestjs/common';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { fastifyRequestHandler } from '@trpc/server/adapters/fastify';

import { TrpcService } from './trpc.service';
import { UserTrpcRouter } from '../../modules/user/user.trpc';
import { SpaceTrpcRouter } from '../../modules/space/space.trpc';
import { NoteTrpcRouter } from '../../modules/note/note.trpc';
import { ProjectTrpcRouter } from '../../modules/project/project.trpc';
import { TaskTrpcRouter } from '../../modules/task/task.trpc';
import { AuthTrpcRouter } from '../../modules/auth/auth.trpc';
import { AuthService } from '../../modules/auth/auth.service';
import { UserContext } from '../../common/user-context';

@Injectable()
export class TrpcRouter {
  appRouter;

  constructor(
    private readonly trpc: TrpcService,
    private readonly userRouter: UserTrpcRouter,
    private readonly spaceRouter: SpaceTrpcRouter,
    private readonly noteRouter: NoteTrpcRouter,
    private readonly projectRouter: ProjectTrpcRouter,
    private readonly taskRouter: TaskTrpcRouter,
    private readonly authTrpcRouter: AuthTrpcRouter,
    private readonly authService: AuthService,
  ) {
    this.appRouter = this.trpc.router({
      ...this.userRouter.routes,
      ...this.spaceRouter.routes,
      ...this.noteRouter.routes,
      ...this.projectRouter.routes,
      ...this.taskRouter.routes,
      ...this.authTrpcRouter.routes,
    });
  }

  applyMiddleware(_app: NestFastifyApplication) {
    _app.getHttpAdapter().all(`/trpc/:path`, async (req, res) => {
      const path = (req.params as any).path;

      let authHeader = (req.headers as any).authorization;
      
      if (!authHeader && (req as any).cookies) {
        const token = (req as any).cookies.token;
        if (token) {
          authHeader = `Bearer ${token}`;
        }
      }
      
      let user = undefined;
      if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
        user = await this.authService.validateToken(token);
      }

      const runTrpc = async () => {
        await fastifyRequestHandler({
          router: this.appRouter,
          createContext: async () => {
            if (!user) {
              return { user: undefined };
            }
            return {
              user: {
                userId: user.id,
                email: user.email,
              },
            };
          },
          req,
          res,
          path,
        });
      };

      if (user) {
        await UserContext.run(user, runTrpc);
      } else {
        await runTrpc();
      }
    });
  }
}

export type AppRouter = TrpcRouter['appRouter'];
