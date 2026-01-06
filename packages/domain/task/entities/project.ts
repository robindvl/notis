import type { Task } from "./task";
import type { Space } from "../../core/entities/space";

export interface Project {
  id: string;
  name: string;
  description?: string;
  spaceId: string;
  space?: Space;
  createdAt: Date;
  updatedAt: Date;
  tasks?: Task[];
}
