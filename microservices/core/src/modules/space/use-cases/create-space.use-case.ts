import { Injectable } from '@nestjs/common';
import { Space, SpaceCreateDto, SpaceRepository } from '@repo/domain';

@Injectable()
export class CreateSpaceUseCase {
  constructor(private readonly repository: SpaceRepository) {}

  async execute(dto: SpaceCreateDto): Promise<Space> {
    return this.repository.create(dto);
  }
}

