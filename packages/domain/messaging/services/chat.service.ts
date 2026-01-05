import { Message } from '../entities/message';
import { Room } from '../entities/room';

export interface ChatService {
  sendMessage(roomId: string, authorId: string, body: string): Promise<Message>;
  getRoomMessages(roomId: string): Promise<Message[]>;
  createDirectRoom(userId1: string, userId2: string): Promise<Room>;
  createGroupRoom(name: string, participantIds: string[]): Promise<Room>;
}

