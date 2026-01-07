import { Middleware, RequestContext, FetchParams } from '../@generated/core.api';
import { UserContext } from './user-context';

export class CoreApiAuthMiddleware implements Middleware {
  async pre(context: RequestContext): Promise<FetchParams | void> {
    const user = UserContext.get();
    if (!user) {
      return;
    }

    const headers = {
      ...context.init.headers,
      'x-user-id': user.id,
      'x-user-data': JSON.stringify(user),
    };

    return {
      url: context.url,
      init: {
        ...context.init,
        headers,
      },
    };
  }
}
