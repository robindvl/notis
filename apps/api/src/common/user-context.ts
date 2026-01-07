import { AsyncLocalStorage } from 'async_hooks';
import { User } from '@repo/domain';

export class UserContext {
  private static storage = new AsyncLocalStorage<User>();

  static run<T>(user: User, callback: () => T): T {
    return this.storage.run(user, callback);
  }

  static get(): User | undefined {
    return this.storage.getStore();
  }
}
