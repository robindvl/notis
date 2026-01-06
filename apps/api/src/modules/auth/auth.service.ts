import { Injectable } from '@nestjs/common';
import { AuthRepository, LoginDto, RegisterDto, AuthResponseDto, User } from '@repo/domain';

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  async validateToken(token: string): Promise<User | null> {
    return this.authRepository.validateToken(token);
  }

  async login(input: LoginDto): Promise<AuthResponseDto> {
    return this.authRepository.login(input);
  }

  async register(input: RegisterDto): Promise<AuthResponseDto> {
    return this.authRepository.register(input);
  }
}
