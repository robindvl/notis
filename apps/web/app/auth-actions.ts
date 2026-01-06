'use server';

import { cookies } from 'next/headers';
import { AUTH_TOKEN_MAX_AGE } from '@repo/domain';

export async function setSession(token: string) {
  const cookieStore = await cookies();
  cookieStore.set('token', token, {
    httpOnly: true, // Защита от XSS (JS не может прочитать куку)
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: AUTH_TOKEN_MAX_AGE,
  });
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete('token');
}

