import { Injectable } from '@nestjs/common';
import { Task, TaskRepository } from '@repo/domain';

@Injectable()
export class TaskService {
  constructor(
    private readonly taskRepository: TaskRepository,
  ) {}

  async list(projectId: string): Promise<Task[]> {
    return this.taskRepository.findByProjectId(projectId);
  }

  // /**
  //  * @deprecated Use TaskService.list(projectId) instead
  //  */
  // async findByProjectId(projectId: string): Promise<Task[]> {
  //   return this.taskRepository.findByProjectId(projectId);
  // }

  async findByAssigneeId(assigneeId: string): Promise<Task[]> {
    return this.taskRepository.findByAssigneeId(assigneeId);
  }

  async findById(id: string): Promise<Task | null> {
    return this.taskRepository.findById(id);
  }
}

