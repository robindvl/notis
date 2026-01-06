/**
 * DTO for creating a new project
 */
export interface CreateProjectDto {
  /**
   * @minLength 3
   * @maxLength 100
   */
  name: string;
  /**
   * @maxLength 500
   */
  description?: string;
  spaceId: string;
}

/**
 * DTO for updating an existing project
 */
export interface UpdateProjectDto {
  /**
   * @minLength 3
   * @maxLength 100
   */
  name?: string;
  /**
   * @maxLength 500
   */
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
