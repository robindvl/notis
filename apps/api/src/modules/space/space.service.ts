import { Injectable } from '@nestjs/common';
import { Space, SpaceRepository } from '@repo/domain';

@Injectable()
export class SpaceService {
  constructor(
    private readonly spaceRepository: SpaceRepository,
  ) {}

  async list(): Promise<Space[]> {
    return this.spaceRepository.findByOwnerId('mock-owner');
  }

  async findById(id: string): Promise<Space | null> {
    return this.spaceRepository.findById(id);
  }
}

