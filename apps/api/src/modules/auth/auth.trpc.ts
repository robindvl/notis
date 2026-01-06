import { Injectable } from '@nestjs/common';
import { z } from 'zod';
import { TrpcService } from '../../processors/trpc/trpc.service';
import { AuthService } from './auth.service';

@Injectable()
export class AuthTrpcRouter {
  routes;

  constructor(
    private readonly trpc: TrpcService,
    private readonly authService: AuthService,
  ) {
    this.routes = {
      auth: this.trpc.router({
        login: this.trpc.procedure
          .input(z.object({ email: z.string(), password: z.string() }))
          .mutation(async ({ input }) => {
            const response = await fetch(`${process.env.AUTH_SERVICE_URL || 'http://localhost:5001/auth'}/login`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(input),
            });
            if (!response.ok) {
              const error = (await response.json()) as { message?: string };
              throw new Error(error.message || 'Login failed');
            }
            return response.json();
          }),
        register: this.trpc.procedure
          .input(z.object({ email: z.string(), password: z.string(), name: z.string() }))
          .mutation(async ({ input }) => {
            const response = await fetch(`${process.env.AUTH_SERVICE_URL || 'http://localhost:5001/auth'}/register`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(input),
            });
            if (!response.ok) {
              const error = (await response.json()) as { message?: string };
              throw new Error(error.message || 'Registration failed');
            }
            return response.json();
          }),
      }),
    };
  }
}

