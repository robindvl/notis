/**
 * DTO for creating a new task
 */
export interface CreateTaskDto {
  title: string;
  description?: string;
  statusId: string;
  projectId: string;
  assigneeId?: string;
}

/**
 * DTO for updating an existing task
 */
export interface UpdateTaskDto {
  title?: string;
  description?: string;
  statusId?: string;
  assigneeId?: string;
}

/**
 * Response DTO for Task
 */
export interface TaskResponseDto {
  id: string;
  title: string;
  description?: string;
  statusId: string;
  projectId: string;
  assigneeId?: string;
  createdAt: Date;
  updatedAt: Date;
  isOverdue?: boolean;
}

