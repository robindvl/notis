import { Injectable } from '@nestjs/common';
import { Task, TaskRepository, TaskNotFoundException } from '@repo/domain';
import { faker } from '@faker-js/faker/locale/ru';
import { uuidv7 } from 'uuidv7';

@Injectable()
export class TaskRepositoryMock extends TaskRepository {
  private tasks: Task[] = [];
  private generatedSpaceIds: Set<string> = new Set();

  private generateTasksForProject(projectId: string) {
    if (this.generatedSpaceIds.has(projectId)) return;

    const tasks: Task[] = Array.from({ length: 4 }).map(() => ({
      id: uuidv7(),
      title: faker.lorem.sentence(3),
      description: faker.lorem.sentence(),
      statusId: uuidv7(),
      projectId: projectId,
      assigneeId: uuidv7(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    this.tasks.push(...tasks);
    this.generatedSpaceIds.add(projectId);
  }

  async findById(id: string): Promise<Task | null> {
    return this.tasks.find((task) => task.id === id) || null;
  }

  async findByProjectId(projectId: string): Promise<Task[]> {
    this.generateTasksForProject(projectId);
    return this.tasks.filter((task) => task.projectId === projectId);
  }

  async findByAssigneeId(assigneeId: string): Promise<Task[]> {
    if (this.tasks.length === 0) {
      this.generateTasksForProject(uuidv7());
    }
    return this.tasks.filter((task) => task.assigneeId === assigneeId);
  }

  async create(task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<Task> {
    const newTask: Task = {
      ...task,
      id: uuidv7(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.tasks.push(newTask);
    return newTask;
  }

  async update(id: string, task: Partial<Task>): Promise<Task> {
    const index = this.tasks.findIndex((task) => task.id === id);
    if (index === -1) throw new TaskNotFoundException(id);
    const updatedTask = { ...this.tasks[index], ...task, id, updatedAt: new Date() } as Task;
    this.tasks[index] = updatedTask;
    return updatedTask;
  }

  async delete(id: string): Promise<void> {
    this.tasks = this.tasks.filter((n) => n.id !== id);
  }

  async reorder(parentId: string, taskIds: string[]): Promise<void> {
    // mock implementation
  }
}
