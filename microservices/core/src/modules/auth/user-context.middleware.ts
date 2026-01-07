import {
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UserContextService } from './user-context.service';
import { User } from '@repo/domain';

@Injectable()
export class UserContextMiddleware implements NestMiddleware {
  constructor(private readonly userContext: UserContextService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const userId = req.headers['x-user-id'];
    const userDataStr = req.headers['x-user-data'];

    if (!userId) {
      return next();
    }

    let user: User;
    if (userDataStr) {
      try {
        user = JSON.parse(userDataStr as string);
      } catch (e) {
        user = { id: userId as string, name: 'Unknown', email: '', login: '' };
      }
    } else {
      user = { id: userId as string, name: 'User', email: '', login: '' };
    }

    this.userContext.runWithUser(user, () => next());
  }
}
