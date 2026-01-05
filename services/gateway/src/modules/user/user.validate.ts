import typia from 'typia';

type UserBase = {
  /**
   * @minLength 7
   */
  name: string;
  /**
   * @minLength 3
   * @maxLength 55
   */
  login: string;
  /**
   * @minLength 3
   * @maxLength 55
   */
  email: string;
};

export const UserCreateSchema = typia.createAssert<UserBase>();

export const UserUpdateSchema = typia.createAssert<
  UserBase & {
    id: string;
  }
>();
