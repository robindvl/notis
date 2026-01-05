export interface Participant {
  roomId: string;
  userId: string;
  role: "member" | "admin" | "owner";
  joinedAt: number;
}

