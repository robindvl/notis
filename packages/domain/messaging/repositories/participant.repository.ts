import { Participant } from '../entities/participant';

export interface ParticipantRepository {
  findByRoomId(roomId: string): Promise<Participant[]>;
  findByUserId(userId: string): Promise<Participant[]>;
  addParticipant(participant: Participant): Promise<void>;
  updateRole(roomId: string, userId: string, role: Participant['role']): Promise<void>;
  removeParticipant(roomId: string, userId: string): Promise<void>;
}

