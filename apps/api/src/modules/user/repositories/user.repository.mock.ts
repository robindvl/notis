import { Injectable } from '@nestjs/common';
import { User, UserRepository, UserNotFoundException } from '@repo/domain';
import { uuidv7 } from 'uuidv7';

@Injectable()
export class UserRepositoryMock extends UserRepository {
  private users: User[] = [
    { id: uuidv7(), name: 'John Doe 1', email: 'john1@doe.com', login: 'johndoe1' },
    { id: uuidv7(), name: 'John Doe 2', email: 'john2@doe.com', login: 'johndoe2' },
    { id: uuidv7(), name: 'John Doe 3', email: 'john3@doe.com', login: 'johndoe3' },
    { id: uuidv7(), name: 'John Doe 4', email: 'john4@doe.com', login: 'johndoe4' },
    { id: uuidv7(), name: 'John Doe 5', email: 'john5@doe.com', login: 'johndoe5' },
    { id: uuidv7(), name: 'John Doe 6', email: 'john6@doe.com', login: 'johndoe6' },
  ];

  async findById(id: string): Promise<User | null> {
    return this.users.find((u) => u.id === id) || null;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find((u) => u.email === email) || null;
  }

  async create(user: Omit<User, 'id'>): Promise<User> {
    const newUser: User = { ...user, id: uuidv7() };
    this.users.push(newUser);
    return newUser;
  }

  async update(id: string, user: Partial<User>): Promise<User> {
    const index = this.users.findIndex((u) => u.id === id);
    if (index === -1) throw new UserNotFoundException(id);
    const updatedUser = { ...this.users[index], ...user, id } as User;
    this.users[index] = updatedUser;
    return updatedUser;
  }

  async delete(id: string): Promise<void> {
    this.users = this.users.filter((u) => u.id !== id);
  }

  async findAll(): Promise<User[]> {
    return this.users;
  }
}
