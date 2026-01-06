import { LoginDto, RegisterDto, AuthResponseDto } from '../dto/auth.dto';
import { User } from '../entities/user';

export abstract class AuthRepository {
  abstract login(dto: LoginDto): Promise<AuthResponseDto>;
  abstract register(dto: RegisterDto): Promise<AuthResponseDto>;
  abstract validateToken(token: string): Promise<User | null>;
}

