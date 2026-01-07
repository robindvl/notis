import { User, UserRepository, type CreateUserDbInput, UserNotFoundException } from '@repo/domain';
import { UserModel } from '../models/user.model';

export class MongooseUserRepository extends UserRepository {
  async findAll(): Promise<User[]> {
    const users = await UserModel.find();
    return users.map(u => u.toJSON() as User);
  }

  async findById(id: string): Promise<User | null> {
    const user = await UserModel.findOne({ id });
    return user ? (user.toJSON() as User) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await UserModel.findOne({ email });
    return user ? (user.toJSON() as User) : null;
  }

  async create(user: CreateUserDbInput): Promise<User> {
    const newUser = await UserModel.create(user);
    return newUser.toJSON() as User;
  }

  async update(id: string, user: Partial<User>): Promise<User> {
    const updatedUser = await UserModel.findOneAndUpdate({ id }, user, { new: true });
    if (!updatedUser) throw new UserNotFoundException(id);
    return updatedUser.toJSON() as User;
  }

  async delete(id: string): Promise<void> {
    await UserModel.findOneAndDelete({ id });
  }
}
