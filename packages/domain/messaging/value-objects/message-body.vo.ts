// monorepo/packages/domain/messaging/value-objects/message-body.vo.ts
export class MessageBody {
  constructor(private readonly value: string) {
    if (value.length === 0) {
      throw new Error('Message body cannot be empty');
    }
  }

  get content(): string {
    return this.value;
  }
}

