import { Task } from '../entities/task';

export interface TaskRepository {
  findById(id: string): Promise<Task | null>;
  findByBoardId(boardId: string): Promise<Task[]>;
  findByAssigneeId(assigneeId: string): Promise<Task[]>;
  create(task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<Task>;
  update(id: string, task: Partial<Task>): Promise<Task>;
  delete(id: string): Promise<void>;
}

