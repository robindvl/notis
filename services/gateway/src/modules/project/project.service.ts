import { Injectable } from '@nestjs/common';
import { Project, ProjectRepository } from '@repo/domain';

@Injectable()
export class ProjectService {
  constructor(
    private readonly projectRepository: ProjectRepository,
  ) {}

  async list(ownerId: string): Promise<Project[]> {
    return this.projectRepository.findByOwnerId(ownerId);
  }

  // /**
  //  * @deprecated Use ProjectService.list(ownerId) instead
  //  */
  // async findBySpaceId(spaceId: string): Promise<Project[]> {
  //   return this.projectRepository.findByOwnerId(spaceId);
  // }

  async findById(id: string): Promise<Project | null> {
    return this.projectRepository.findById(id);
  }
}

