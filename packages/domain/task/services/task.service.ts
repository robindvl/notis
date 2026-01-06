import { Task } from '../entities/task';

export interface TaskService {
  createTask(data: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<Task>;
  moveTask(taskId: string, statusId: string): Promise<Task>;
  assignTask(taskId: string, assigneeId: string): Promise<Task>;
  getTasksByProject(projectId: string): Promise<Task[]>;
}

