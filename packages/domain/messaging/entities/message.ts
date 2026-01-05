export interface Message {
  id: string;
  roomId: string;
  authorId: string;
  body: string;
  createdAt: number;
  updatedAt?: number;
  isDeleted?: boolean;
}
