import { Injectable } from '@nestjs/common';
import {
  AuthRepository,
  AuthResponseDto,
  LoginDto,
  RegisterDto,
  User,
} from '@repo/domain';
import { faker } from '@faker-js/faker/locale/ru';
import { uuidv7 } from 'uuidv7';

@Injectable()
export class AuthRepositoryMock extends AuthRepository {
  private users: (User & { password?: string })[] = [];

  constructor() {
    super();
    // Инициализируем несколькими пользователями для тестов
    this.users.push({
      id: uuidv7(),
      email: 'test@example.com',
      password: 'password123',
      name: 'Test User',
      login: 'testuser',
    });
  }

  async login(dto: LoginDto): Promise<AuthResponseDto> {
    const user = this.users.find(
      (u) => u.email === dto.email && u.password === dto.password,
    );

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const { password, ...userWithoutPassword } = user;
    return {
      user: userWithoutPassword,
      token: `mock-token-${user.id}`,
    };
  }

  async register(dto: RegisterDto): Promise<AuthResponseDto> {
    const existingUser = this.users.find((u) => u.email === dto.email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    const newUser: User & { password?: string } = {
      id: uuidv7(),
      email: dto.email,
      password: dto.password,
      name: dto.name,
      login: dto.login || dto.email.split('@')[0] || 'user',
    };

    this.users.push(newUser);

    const { password, ...userWithoutPassword } = newUser;
    return {
      user: userWithoutPassword,
      token: `mock-token-${newUser.id}`,
    };
  }

  async validateToken(token: string): Promise<User | null> {
    if (!token || !token.startsWith('mock-token-')) {
      return null;
    }

    const userId = token.replace('mock-token-', '');
    const user = this.users.find((u) => u.id === userId);

    if (!user) {
      return null;
    }

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}

