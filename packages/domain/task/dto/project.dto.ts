/**
 * DTO for creating a new project
 */
export interface CreateProjectDto {
  name: string;
  description?: string;
  spaceId: string;
}

/**
 * DTO for updating an existing project
 */
export interface UpdateProjectDto {
  name?: string;
  description?: string;
}

/**
 * Response DTO for Project
 */
export interface ProjectResponseDto {
  id: string;
  name: string;
  description?: string;
  spaceId: string;
  createdAt: Date;
  updatedAt: Date;
  taskCount?: number;
}

