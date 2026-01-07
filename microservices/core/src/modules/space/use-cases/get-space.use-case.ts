import { Injectable } from '@nestjs/common';
import { Space, SpaceRepository, SpaceNotFoundException } from '@repo/domain';

@Injectable()
export class GetSpaceUseCase {
  constructor(private readonly repository: SpaceRepository) {}

  async execute(id: string): Promise<Space> {
    const space = await this.repository.findById(id);
    if (!space) {
      throw new SpaceNotFoundException(id);
    }
    return space;
  }
}

