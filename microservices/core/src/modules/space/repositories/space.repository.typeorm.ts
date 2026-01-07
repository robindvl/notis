import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Space, SpaceRepository } from '@repo/domain';
import { SpaceEntity } from '../entities/space.entity';
import { uuidv7 } from 'uuidv7';

@Injectable()
export class SpaceRepositoryTypeOrm extends SpaceRepository {
  constructor(
    @InjectRepository(SpaceEntity)
    private readonly repository: Repository<SpaceEntity>,
  ) {
    super();
  }

  async findAll(): Promise<Space[]> {
    const spaces = await this.repository.find();
    return spaces.map(this.mapToDomain);
  }

  async findById(id: string): Promise<Space | null> {
    const space = await this.repository.findOneBy({ id });
    return space ? this.mapToDomain(space) : null;
  }

  async findByOwnerId(ownerId: string): Promise<Space[]> {
    // Current SpaceEntity doesn't have ownerId, but the repository interface requires it.
    // For now, returning all or empty if needed.
    return this.findAll();
  }

  async create(space: Omit<Space, 'id' | 'createdAt'>): Promise<Space> {
    const newSpace = this.repository.create({
      ...space,
      id: uuidv7(),
    });
    const saved = await this.repository.save(newSpace);
    return this.mapToDomain(saved);
  }

  async update(id: string, space: Partial<Space>): Promise<Space> {
    await this.repository.update(id, space);
    const updated = await this.findById(id);
    if (!updated) throw new Error('Space not found');
    return updated;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  private mapToDomain(entity: SpaceEntity): Space {
    return {
      ...entity,
      createdAt: (entity.createdAt as any) instanceof Date ? (entity.createdAt as any).toISOString() : entity.createdAt,
    };
  }
}

