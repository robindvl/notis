import { Injectable, NotFoundException } from '@nestjs/common';
import { SpaceApi } from '../../@generated/api';
import { Space as SpaceModel, SpaceCreate, SpaceUpdate } from '../../@generated/models';
import { SpaceRepository } from '@repo/domain';
import { SpaceResponseDto } from './space.dto';

@Injectable()
export class SpaceService implements SpaceApi {
  constructor(private readonly repository: SpaceRepository) {}

  async getSpaces(_request: Request): Promise<SpaceModel[]> {
    const spaces = await this.repository.findAll();
    return SpaceResponseDto.fromDomainArray(spaces);
  }

  async createSpace(
    spaceCreate: SpaceCreate,
    _request: Request,
  ): Promise<SpaceModel> {
    const space = await this.repository.create(spaceCreate);
    return SpaceResponseDto.fromDomain(space);
  }

  async getSpace(id: string, _request: Request): Promise<SpaceModel> {
    const space = await this.repository.findById(id);
    if (!space) {
      throw new NotFoundException(`Space with ID ${id} not found`);
    }
    return SpaceResponseDto.fromDomain(space);
  }

  async updateSpace(
    id: string,
    spaceUpdate: SpaceUpdate,
    _request: Request,
  ): Promise<SpaceModel> {
    const space = await this.repository.update(id, spaceUpdate);
    return SpaceResponseDto.fromDomain(space);
  }

  async deleteSpace(id: string, _request: Request): Promise<void> {
    await this.repository.delete(id);
  }
}