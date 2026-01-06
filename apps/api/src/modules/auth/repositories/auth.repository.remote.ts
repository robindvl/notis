import { Injectable } from '@nestjs/common';
import { AuthRepository, AuthResponseDto, LoginDto, RegisterDto, User, AUTH_ROUTES } from '@repo/domain';

@Injectable()
export class AuthRepositoryRemote extends AuthRepository {
  private readonly authServiceUrl = (process.env.AUTH_SERVICE_URL
    || 'http://127.0.0.1:5001/auth').replace(/\/auth$/, '');

  async login(input: LoginDto): Promise<AuthResponseDto> {
    const response = await fetch(`${this.authServiceUrl}${AUTH_ROUTES.LOGIN}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      const error = (await response.json()) as { message?: string };
      throw new Error(error.message || 'Login failed');
    }

    const data = await response.json();
    return data as AuthResponseDto;
  }

  async register(input: RegisterDto): Promise<AuthResponseDto> {
    const response = await fetch(`${this.authServiceUrl}${AUTH_ROUTES.REGISTER}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      const error = (await response.json()) as { message?: string };
      throw new Error(error.message || 'Registration failed');
    }

    const data = await response.json();
    return data as AuthResponseDto;
  }

  async validateToken(token: string): Promise<User | null> {
    try {
      const response = await fetch(`${this.authServiceUrl}${AUTH_ROUTES.VALIDATE}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`[Gateway] Auth validation failed with status ${response.status}: ${errorText}`);
        return null;
      }

      const data = (await response.json()) as { user: any };
      return data.user;
    } catch (error) {
      console.error('Error validating token:', error);
      return null;
    }
  }
}

