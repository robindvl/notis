import { Board } from '../entities/board';

export interface BoardRepository {
  findById(id: string): Promise<Board | null>;
  findByProjectId(projectId: string): Promise<Board[]>;
  create(board: Omit<Board, 'id' | 'createdAt' | 'updatedAt'>): Promise<Board>;
  update(id: string, board: Partial<Board>): Promise<Board>;
  delete(id: string): Promise<void>;
}

