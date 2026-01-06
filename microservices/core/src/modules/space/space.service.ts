import { Injectable, NotFoundException } from '@nestjs/common';
import { SpaceApi } from '../../@generated/api';
import { Space, SpaceCreate, SpaceUpdate } from '../../@generated/models';
import { SpaceRepository } from '@repo/domain';

@Injectable()
export class SpaceService implements SpaceApi {
  constructor(private readonly repository: SpaceRepository) {}

  async getSpaces(request: Request): Promise<Space[]> {
    const spaces = await this.repository.findAll();
    return spaces.map((s) => ({
      id: s.id,
      name: s.name,
      img: s.img,
      createdAt: s.createdAt,
    }));
  }

  async createSpace(
    spaceCreate: SpaceCreate,
    request: Request,
  ): Promise<Space> {
    const space = await this.repository.create({
      name: spaceCreate.name,
      img: spaceCreate.img || '',
    });
    return {
      id: space.id,
      name: space.name,
      img: space.img,
      createdAt: space.createdAt,
    };
  }

  async getSpace(id: string, request: Request): Promise<Space> {
    const space = await this.repository.findById(id);
    if (!space) {
      throw new NotFoundException(`Space with ID ${id} not found`);
    }
    return {
      id: space.id,
      name: space.name,
      img: space.img,
      createdAt: space.createdAt,
    };
  }

  async updateSpace(
    id: string,
    spaceUpdate: SpaceUpdate,
    request: Request,
  ): Promise<Space> {
    const space = await this.repository.update(id, spaceUpdate);
    return {
      id: space.id,
      name: space.name,
      img: space.img,
      createdAt: space.createdAt,
    };
  }

  async deleteSpace(id: string, request: Request): Promise<void> {
    await this.repository.delete(id);
  }
}
