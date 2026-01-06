import { User, UserRepository } from '@repo/domain';

const users: any[] = [];

export class InMemoryUserRepository extends UserRepository {
  async findAll(): Promise<User[]> {
    return users;
  }

  async findById(id: string): Promise<User | null> {
    return users.find(u => u.id === id) || null;
  }

  async findByEmail(email: string): Promise<User | null> {
    return users.find(u => u.email === email) || null;
  }

  async create(user: Omit<User, 'id'>): Promise<User> {
    const newUser = { ...user, id: Date.now().toString() };
    users.push(newUser);
    return newUser as User;
  }

  async update(id: string, user: Partial<User>): Promise<User> {
    const index = users.findIndex(u => u.id === id);
    if (index === -1) throw new Error('User not found');
    users[index] = { ...users[index], ...user };
    return users[index] as User;
  }

  async delete(id: string): Promise<void> {
    const index = users.findIndex(u => u.id === id);
    if (index !== -1) users.splice(index, 1);
  }
}

export const userRepository = new InMemoryUserRepository();
