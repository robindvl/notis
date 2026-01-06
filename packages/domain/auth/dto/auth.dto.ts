import { User } from '../entities/user';

/**
 * DTO for user login
 */
export interface LoginDto {
  /**
   * @format email
   */
  email: string;
  /**
   * @minLength 6
   */
  password: string;
}

/**
 * DTO for user registration
 */
export interface RegisterDto {
  /**
   * @format email
   */
  email: string;
  /**
   * @minLength 6
   */
  password: string;
  /**
   * @minLength 7
   */
  name: string;
  /**
   * @minLength 3
   * @maxLength 55
   */
  login?: string;
}

/**
 * DTO for creating a user (used by UserService)
 */
export interface CreateUserDto {
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
   * @format email
   */
  email: string;
}

/**
 * DTO for updating an existing user
 */
export interface UpdateUserDto extends Partial<CreateUserDto> {
  /**
   * Unique identifier (UUID)
   */
  id: string;
}

/**
 * DTO for authentication response
 */
export interface AuthResponseDto {
  user: User;
  token: string;
}

/**
 * Internal interface for user with password (for repository/auth logic)
 */
export interface UserWithPassword extends User {
  password?: string;
}

/**
 * Input for creating a user (internal/repository)
 */
export interface CreateUserDbInput extends Omit<User, 'id'> {
  password?: string;
}
