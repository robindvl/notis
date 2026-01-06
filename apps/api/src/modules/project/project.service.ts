import { Injectable } from '@nestjs/common';
import { 
  Project, 
  ProjectRepository, 
  CreateProjectDto, 
  UpdateProjectDto 
} from '@repo/domain';

@Injectable()
export class ProjectService {
  constructor(
    private readonly projectRepository: ProjectRepository,
  ) {}

  async list(spaceId: string): Promise<Project[]> {
    return this.projectRepository.findBySpaceId(spaceId);
  }

  async findById(id: string): Promise<Project | null> {
    return this.projectRepository.findById(id);
  }

  async create(dto: CreateProjectDto): Promise<Project> {
    return this.projectRepository.create(dto as any);
  }

  async update(id: string, dto: UpdateProjectDto): Promise<Project> {
    return this.projectRepository.update(id, dto);
  }
}

