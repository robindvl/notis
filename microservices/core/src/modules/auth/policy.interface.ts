import { User } from '@repo/domain';

export interface IPolicy<T> {
  canCreate(user: User, entity: T): boolean | Promise<boolean>;
  canRead(user: User, entity: T): boolean | Promise<boolean>;
  canUpdate(user: User, entity: T): boolean | Promise<boolean>;
  canDelete(user: User, entity: T): boolean | Promise<boolean>;
}
