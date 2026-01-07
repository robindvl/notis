import { Injectable } from '@nestjs/common';
import { Space, SpaceRepository } from '@repo/domain';

@Injectable()
export class GetSpacesUseCase {
  constructor(private readonly repository: SpaceRepository) {}

  async execute(): Promise<Space[]> {
    return this.repository.findAll();
  }
}

