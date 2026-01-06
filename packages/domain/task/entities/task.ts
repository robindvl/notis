import type { Project } from "./project";

export interface Task {
  id: string;
  title: string;
  description?: string;
  statusId: string;
  projectId: string;
  project?: Project;
  assigneeId?: string;
  createdAt: Date;
  updatedAt: Date;
}
