import { Injectable } from '@nestjs/common';
import { Space, SpaceCreateDto, SpaceRepository } from '@repo/domain';
import typia from 'typia';

@Injectable()
export class CreateSpaceUseCase {
  constructor(private readonly repository: SpaceRepository) {}

  async execute(dto: SpaceCreateDto): Promise<Space> {
    typia.assert<SpaceCreateDto>(dto);
    return this.repository.create(dto);
  }
}

