import { Injectable } from '@nestjs/common';
import { 
  Task, 
  TaskRepository, 
  CreateTaskDto, 
  UpdateTaskDto 
} from '@repo/domain';

@Injectable()
export class TaskService {
  constructor(
    private readonly taskRepository: TaskRepository,
  ) {}

  async list(projectId: string): Promise<Task[]> {
    return this.taskRepository.findByProjectId(projectId);
  }

  async findByAssigneeId(assigneeId: string): Promise<Task[]> {
    return this.taskRepository.findByAssigneeId(assigneeId);
  }

  async findById(id: string): Promise<Task | null> {
    return this.taskRepository.findById(id);
  }

  async create(dto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.create(dto);
  }

  async update(id: string, dto: UpdateTaskDto): Promise<Task> {
    return this.taskRepository.update(id, dto);
  }
}

