import { Injectable } from '@nestjs/common';
import { initTRPC, TRPCError } from '@trpc/server';
import superjson from 'superjson';

export interface TrpcContext {
  user?: {
    userId: string;
    email: string;
  };
}

@Injectable()
export class TrpcService {
  trpc = initTRPC.context<TrpcContext>().create({
    transformer: superjson,
  });

  procedure = this.trpc.procedure;

  // Middleware for protected routes
  protectedProcedure = this.trpc.procedure.use(({ ctx, next }) => {
    if (!ctx.user) {
      throw new TRPCError({ code: 'UNAUTHORIZED' });
    }
    return next({
      ctx: {
        ...ctx,
        user: ctx.user,
      },
    });
  });

  router = this.trpc.router;
  mergeRouters = this.trpc.mergeRouters;
}
