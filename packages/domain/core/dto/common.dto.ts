/**
 * Common DTO for requests identified by a single ID
 */
export interface IdDto {
  /**
   * Unique identifier (UUID)
   */
  id: string;
}

/**
 * Common DTO for paginated requests
 */
export interface PaginationDto {
  /**
   * Page number (starts from 1)
   * @type integer
   * @minimum 1
   */
  page: number;

  /**
   * Number of items per page
   * @type integer
   * @minimum 1
   * @maximum 100
   */
  size: number;
}

