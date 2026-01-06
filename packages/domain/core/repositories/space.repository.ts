import { Space } from '../entities/space';

export abstract class SpaceRepository {
  abstract findAll(): Promise<Space[]>;
  abstract findById(id: string): Promise<Space | null>;
  abstract findByOwnerId(ownerId: string): Promise<Space[]>;
  abstract create(space: Omit<Space, 'id' | 'createdAt'>): Promise<Space>;
  abstract update(id: string, space: Partial<Space>): Promise<Space>;
  abstract delete(id: string): Promise<void>;
}
