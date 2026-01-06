import { Project } from '../entities/project';

export abstract class ProjectRepository {
  abstract findById(id: string): Promise<Project | null>;
  abstract findByOwnerId(ownerId: string): Promise<Project[]>;
  abstract create(project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<Project>;
  abstract update(id: string, project: Partial<Project>): Promise<Project>;
  abstract delete(id: string): Promise<void>;
}

