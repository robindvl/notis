export interface Room {
  id: string;
  name?: string;
  type: "direct" | "group" | "task" | "document" | "assistant" | "system";
  isActive: boolean;
  participantIds: string[];
  createdAt: number;
  updatedAt: number;
}
