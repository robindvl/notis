import { Space } from '../entities/space';

export interface SpaceRepository {
  findById(id: string): Promise<Space | null>;
  findByOwnerId(ownerId: string): Promise<Space[]>;
  create(space: Omit<Space, 'id' | 'createdAt' | 'updatedAt'>): Promise<Space>;
  update(id: string, space: Partial<Space>): Promise<Space>;
  delete(id: string): Promise<void>;
}

