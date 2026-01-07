import { User, UserRepository, type CreateUserDbInput, UserNotFoundException } from '@repo/domain';
import { uuidv7 } from 'uuidv7';

export class MemoryUserRepository extends UserRepository {
  private users: (User & { password?: string })[] = [];

  async findAll(): Promise<User[]> {
    return this.users as User[];
  }

  async findById(id: string): Promise<User | null> {
    const user = this.users.find(u => u.id === id);
    return (user as User) || null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find(u => u.email === email);
    return (user as User) || null;
  }

  async create(user: CreateUserDbInput): Promise<User> {
    const newUser: User & { password?: string } = {
      ...user,
      id: uuidv7(),
    } as User & { password?: string };
    
    this.users.push(newUser);
    return newUser as User;
  }

  async update(id: string, user: Partial<User>): Promise<User> {
    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) throw new UserNotFoundException(id);
    
    this.users[index] = { ...this.users[index], ...user, id } as User & { password?: string };
    return this.users[index] as User;
  }

  async delete(id: string): Promise<void> {
    this.users = this.users.filter(u => u.id !== id);
  }
}
