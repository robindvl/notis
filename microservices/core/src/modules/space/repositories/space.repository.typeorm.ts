import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Space, SpaceCreateDto, SpaceRepository, SpaceUpdateDto, SpaceNotFoundException } from '@repo/domain';
import { SpaceEntity } from '../entities/space.entity';
import { uuidv7 } from 'uuidv7';
import { SpacePersistenceMapper } from '../mappers/space-persistence.mapper';

@Injectable()
export class SpaceRepositoryTypeOrm extends SpaceRepository {
  constructor(
    @InjectRepository(SpaceEntity)
    private readonly repository: Repository<SpaceEntity>,
  ) {
    super();
  }

  async findAll(): Promise<Space[]> {
    const entities = await this.repository.find();
    return SpacePersistenceMapper.toDomainArray(entities);
  }

  async findById(id: string): Promise<Space | null> {
    const entity = await this.repository.findOneBy({ id });
    return entity ? SpacePersistenceMapper.toDomain(entity) : null;
  }

  async findByOwnerId(ownerId: string): Promise<Space[]> {
    // SpaceEntity doesn't have ownerId yet
    return this.findAll();
  }

  async create(space: SpaceCreateDto): Promise<Space> {
    const newSpace = this.repository.create({
      ...space,
      id: uuidv7(),
    });
    const saved = await this.repository.save(newSpace);
    return SpacePersistenceMapper.toDomain(saved);
  }

  async update(id: string, data: SpaceUpdateDto): Promise<Space> {
    const spaceEntity = await this.repository.findOneBy({ id });
    if (!spaceEntity) throw new SpaceNotFoundException(id);

    const updatedSpace = this.repository.create({
      ...spaceEntity,
      ...data,
      id,
    });

    const saved = await this.repository.save(updatedSpace);
    return SpacePersistenceMapper.toDomain(saved);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async deleteAll(): Promise<void> {
    await this.repository.clear();
  }
}
