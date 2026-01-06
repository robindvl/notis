import { Injectable } from '@nestjs/common';
import { User, UserRepository } from '@repo/domain';

@Injectable()
export class UserRepositoryRemote extends UserRepository {
  private readonly authBaseUrl = (process.env.AUTH_SERVICE_URL || 'http://127.0.0.1:5001/auth').replace(/\/auth$/, '');

  async findAll(): Promise<User[]> {
    try {
      const response = await fetch(`${this.authBaseUrl}/users`);
      if (!response.ok) return [];
      return await response.json() as User[];
    } catch (error) {
      console.error('[UserRepositoryRemote] Error fetching users:', error);
      return [];
    }
  }

  async findById(id: string): Promise<User | null> {
    try {
      const response = await fetch(`${this.authBaseUrl}/users/${id}`);
      if (!response.ok) return null;
      return await response.json() as User;
    } catch (error) {
      console.error(`[UserRepositoryRemote] Error fetching user ${id}:`, error);
      return null;
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    // This could be implemented by adding a specific endpoint in the auth microservice
    console.warn('[UserRepositoryRemote] findByEmail not implemented via remote fetch yet');
    return null;
  }

  async create(user: Omit<User, 'id'>): Promise<User> {
    try {
      const response = await fetch(`${this.authBaseUrl}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });
      if (!response.ok) {
        throw new Error(`Failed to create user via auth service: ${response.statusText}`);
      }
      return await response.json() as User;
    } catch (error) {
      console.error('[UserRepositoryRemote] Error creating user:', error);
      throw error;
    }
  }

  async update(id: string, user: Partial<User>): Promise<User> {
    try {
      const response = await fetch(`${this.authBaseUrl}/users/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });
      if (!response.ok) throw new Error('Failed to update user');
      return await response.json() as User;
    } catch (error) {
      console.error(`[UserRepositoryRemote] Error updating user ${id}:`, error);
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const response = await fetch(`${this.authBaseUrl}/users/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete user');
    } catch (error) {
      console.error(`[UserRepositoryRemote] Error deleting user ${id}:`, error);
      throw error;
    }
  }
}
