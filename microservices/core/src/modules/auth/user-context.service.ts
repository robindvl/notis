import { Injectable } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';
import { User } from '@repo/domain';

@Injectable()
export class UserContextService {
  private static readonly storage = new AsyncLocalStorage<User>();

  runWithUser<T>(user: User, callback: () => T): T {
    return UserContextService.storage.run(user, callback);
  }

  getUser(): User {
    const user = UserContextService.storage.getStore();
    if (!user) {
      throw new Error('User not authenticated in this context');
    }
    return user;
  }

  isAuthenticated(): boolean {
    return !!UserContextService.storage.getStore();
  }
}
