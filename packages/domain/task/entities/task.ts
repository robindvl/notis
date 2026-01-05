export interface Task {
  id: string;
  title: string;
  description?: string;
  statusId: string;
  boardId: string;
  assigneeId?: string;
  createdAt: Date;
  updatedAt: Date;
}

