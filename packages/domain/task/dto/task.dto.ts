/**
 * DTO for creating a new task
 */
export interface CreateTaskDto {
  /**
   * @minLength 3
   * @maxLength 255
   */
  title: string;
  /**
   * @maxLength 2000
   */
  description?: string;
  statusId: string;
  projectId: string;
  assigneeId?: string;
}

/**
 * DTO for updating an existing task
 */
export interface UpdateTaskDto {
  /**
   * @minLength 3
   * @maxLength 255
   */
  title?: string;
  /**
   * @maxLength 2000
   */
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
