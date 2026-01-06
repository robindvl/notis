import { MongooseUserRepository } from './user.repository.mongoose';
import { MemoryUserRepository } from './user.repository.memory';

const useMemory = process.env.USE_MEMORY === 'false';

export const userRepository = useMemory 
  ? new MemoryUserRepository() 
  : new MongooseUserRepository();
