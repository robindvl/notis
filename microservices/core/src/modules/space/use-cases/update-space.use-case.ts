import { Injectable } from '@nestjs/common';
import { Space, SpaceUpdateDto, SpaceRepository } from '@repo/domain';

@Injectable()
export class UpdateSpaceUseCase {
  constructor(private readonly repository: SpaceRepository) {}

  async execute(id: string, dto: SpaceUpdateDto): Promise<Space> {
    return this.repository.update(id, dto);
  }
}

