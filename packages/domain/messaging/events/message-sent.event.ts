// monorepo/packages/domain/messaging/events/message-sent.event.ts
export interface MessageSentEvent {
  messageId: string;
  roomId: string;
  authorId: string;
  sentAt: number;
}

