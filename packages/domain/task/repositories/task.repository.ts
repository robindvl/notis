import { Task } from '../entities/task';

export abstract class TaskRepository {
  abstract findById(id: string): Promise<Task | null>;
  abstract findByProjectId(projectId: string): Promise<Task[]>;
  abstract findByAssigneeId(assigneeId: string): Promise<Task[]>;
  abstract create(task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<Task>;
  abstract update(id: string, task: Partial<Task>): Promise<Task>;
  abstract delete(id: string): Promise<void>;
}

