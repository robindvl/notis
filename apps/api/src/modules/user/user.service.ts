import { Injectable } from '@nestjs/common';
import { User, UserRepository } from '@repo/domain';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
  ) {}

  async list(page: number, size: number): Promise<User[]> {
    const allUsers = await this.userRepository.findAll();
    const start = (page - 1) * size;
    return allUsers.slice(start, start + size);
  }

  async findById(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  async create(user: Omit<User, 'id'>): Promise<User> {
    return this.userRepository.create(user);
  }
}

