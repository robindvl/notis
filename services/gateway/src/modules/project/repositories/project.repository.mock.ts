import { Injectable } from '@nestjs/common';
import { Project, ProjectRepository } from '@repo/domain';
import { faker } from '@faker-js/faker/locale/ru';
import { uuidv7 } from 'uuidv7';

@Injectable()
export class ProjectRepositoryMock extends ProjectRepository {
  private projects: Project[] = [];
  private generatedSpaceIds: Set<string> = new Set();

  private generateProjectsForSpace(ownerId: string) {
    if (this.generatedSpaceIds.has(ownerId)) return;

    // Генерируем проекты для владельца
    const projects: Project[] = Array.from({ length: 4 }).map(() => ({
      id: uuidv7(),
      name: faker.book.author(),
      description: faker.lorem.sentence(),
      ownerId,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    this.projects.push(...projects);
    this.generatedSpaceIds.add(ownerId);
  }

  async findById(id: string): Promise<Project | null> {
    return this.projects.find((project) => project.id === id) || null;
  }

  async findByOwnerId(ownerId: string): Promise<Project[]> {
    this.generateProjectsForSpace(ownerId);
    return this.projects.filter((project) => project.ownerId === ownerId);
  }

  // Метод для совместимости с предыдущей реализацией, не используется в интерфейсе
  // async findBySpaceId(spaceId: string): Promise<Project[]> {
  //   this.generateProjectsForSpace(spaceId);
  //   return this.projects.filter((n) => n.spaceId === spaceId);
  // }

  async create(project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<Project> {
    const newProject: Project = {
      ...project,
      id: uuidv7(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.projects.push(newProject);
    return newProject;
  }

  async update(id: string, project: Partial<Project>): Promise<Project> {
    const index = this.projects.findIndex((project) => project.id === id);
    if (index === -1) throw new Error('Project not found');
    const updatedProject = { ...this.projects[index], ...project, id, updatedAt: new Date() } as Project;
    this.projects[index] = updatedProject;
    return updatedProject;
  }

  async delete(id: string): Promise<void> {
    this.projects = this.projects.filter((n) => n.id !== id);
  }

  async reorder(parentId: string, projectIds: string[]): Promise<void> {
    // mock implementation
  }
}

