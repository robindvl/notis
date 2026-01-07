import { Injectable } from '@nestjs/common';
import { Space, SpaceCreateDto, SpaceRepository, SpaceUpdateDto } from '@repo/domain';
import { Configuration, SpaceApi } from '../../../@generated/core.api';

@Injectable()
export class SpaceRepositoryRemote extends SpaceRepository {
  private readonly coreApi: SpaceApi;

  constructor() {
    super();
    const config = new Configuration({
      basePath: process.env.CORE_SERVICE_URL || 'http://127.0.0.1:5002',
    });
    this.coreApi = new SpaceApi(config);
  }

  async findAll(): Promise<Space[]> {
    return this.coreApi.getSpaces() as unknown as Promise<Space[]>;
  }

  async findById(id: string): Promise<Space | null> {
    try {
      return (await this.coreApi.getSpace({ id })) as unknown as Space;
    } catch (e) {
      return null;
    }
  }

  async findByOwnerId(ownerId: string): Promise<Space[]> {
    return this.findAll();
  }

  async create(space: SpaceCreateDto): Promise<Space> {
    return this.coreApi.createSpace({
      spaceCreate: space as any,
    }) as unknown as Promise<Space>;
  }

  async update(id: string, space: SpaceUpdateDto): Promise<Space> {
    return this.coreApi.updateSpace({
      id,
      spaceUpdate: space as any,
    }) as unknown as Promise<Space>;
  }

  async delete(id: string): Promise<void> {
    await this.coreApi.deleteSpace({ id });
  }

  async deleteAll(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

