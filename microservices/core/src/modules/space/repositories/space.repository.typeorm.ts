import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Space, SpaceCreateDto, SpaceRepository, SpaceUpdateDto, SpaceNotFoundException } from '@repo/domain';
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
    return this.repository.find();
  }

  async findById(id: string): Promise<Space | null> {
    return this.repository.findOneBy({ id });
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
    return this.repository.save(newSpace);
  }

  async update(id: string, data: SpaceUpdateDto): Promise<Space> {
    const space = await this.findById(id);
    if (!space) throw new SpaceNotFoundException(id);

    const updatedSpace = this.repository.create({
      ...space,
      ...data,
      id,
    });

    return this.repository.save(updatedSpace);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async deleteAll(): Promise<void> {
    await this.repository.clear();
  }
}
