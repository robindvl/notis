export const AUTH_TOKEN_MAX_AGE = 60 * 60 * 24 * 7; // 7 days in seconds

export const AUTH_ROUTES = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  VALIDATE: '/auth/validate',
} as const;

export const USER_ROUTES = {
  BASE: '/users',
  BY_ID: '/users/:id',
} as const;




