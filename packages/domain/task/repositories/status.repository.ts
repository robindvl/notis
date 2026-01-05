import { Status } from '../entities/status';

export interface StatusRepository {
  findById(id: string): Promise<Status | null>;
  findByBoardId(boardId: string): Promise<Status[]>;
  create(status: Omit<Status, 'id'>): Promise<Status>;
  update(id: string, status: Partial<Status>): Promise<Status>;
  delete(id: string): Promise<void>;
}

