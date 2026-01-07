import { Injectable } from '@nestjs/common';
import { Space, SpaceCreateDto, SpaceRepository, SpaceUpdateDto, SpaceNotFoundException } from '@repo/domain';
import { faker } from '@faker-js/faker/locale/ru';
import { uuidv7 } from 'uuidv7';
import { seedSpaces } from '../space.seed';

@Injectable()
export class SpaceRepositoryMock extends SpaceRepository {
  private spaces: Space[] = [];
  private initialized = false;

  private async initialize() {
    if (this.initialized) return;
    this.initialized = true;
    await seedSpaces(this);
  }

  async findById(id: string): Promise<Space | null> {
    await this.initialize();
    return this.spaces.find((s) => s.id === id) || null;
  }

  async findByOwnerId(ownerId: string): Promise<Space[]> {
    await this.initialize();
    return this.spaces;
  }

  async findAll(): Promise<Space[]> {
    await this.initialize();
    return this.spaces;
  }

  async create(space: SpaceCreateDto): Promise<Space> {
    const newSpace: Space = {
      ...space,
      id: uuidv7(),
      createdAt: new Date(),
    };
    this.spaces.push(newSpace);
    return newSpace;
  }

  async update(id: string, data: SpaceUpdateDto): Promise<Space> {
    const index = this.spaces.findIndex((s) => s.id === id);
    if (index === -1) throw new SpaceNotFoundException(id);
    
    const updatedSpace = { 
      ...this.spaces[index], 
      ...data, 
      id 
    };
    this.spaces[index] = updatedSpace;
    
    return updatedSpace;
  }

  async delete(id: string): Promise<void> {
    this.spaces = this.spaces.filter((s) => s.id !== id);
  }

  async deleteAll(): Promise<void> {
    this.spaces = [];
  }
}