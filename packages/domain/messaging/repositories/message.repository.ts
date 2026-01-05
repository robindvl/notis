import { Message } from '../entities/message';

export interface MessageRepository {
  findById(id: string): Promise<Message | null>;
  findByRoomId(roomId: string): Promise<Message[]>;
  create(message: Omit<Message, 'id' | 'createdAt' | 'updatedAt'>): Promise<Message>;
  update(id: string, message: Partial<Message>): Promise<Message>;
  delete(id: string): Promise<void>;
}

