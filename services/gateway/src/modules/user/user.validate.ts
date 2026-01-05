// import { z } from 'zod';

// const userBase = {
//   name: z.string().min(7),
//   login: z.string().min(3).max(55),
//   email: z.string().min(3).max(55),
// };

// export const UserCreateSchema = z.object(userBase);

// export const UserUpdateSchema = z.object({
//   ...userBase,
//   id: z.number(),
// });

import { type } from 'arktype';

const userBase = {
  name: 'string>7',
  login: 'string>3&string<56',
  email: 'string>3&string<56',
} as const;

export const UserCreateSchema = type(userBase);

export const UserUpdateSchema = type({
  ...userBase,
  id: 'number',
});
