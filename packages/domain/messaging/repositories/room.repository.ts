import { Room } from '../entities/room';

export interface RoomRepository {
  findById(id: string): Promise<Room | null>;
  findByParticipantId(participantId: string): Promise<Room[]>;
  create(room: Omit<Room, 'id' | 'createdAt' | 'updatedAt'>): Promise<Room>;
  update(id: string, room: Partial<Room>): Promise<Room>;
  delete(id: string): Promise<void>;
}

