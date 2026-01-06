export interface Task {
  id: string;
  title: string;
  description?: string;
  statusId: string;
  projectId: string;
  assigneeId?: string;
  createdAt: Date;
  updatedAt: Date;
}

