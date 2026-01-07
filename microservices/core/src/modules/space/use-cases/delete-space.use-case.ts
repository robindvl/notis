import { Injectable } from '@nestjs/common';
import { SpaceRepository } from '@repo/domain';

@Injectable()
export class DeleteSpaceUseCase {
  constructor(private readonly repository: SpaceRepository) {}

  async execute(id: string): Promise<void> {
    return this.repository.delete(id);
  }
}

