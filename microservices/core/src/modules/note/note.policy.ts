import { Injectable } from '@nestjs/common';
import { User, Note } from '@repo/domain';
import { IPolicy } from '../auth/policy.interface';
import { SpacePolicy } from '../space/space.policy';

@Injectable()
export class NotePolicy implements IPolicy<Note> {
  constructor(private readonly spacePolicy: SpacePolicy) {}

  async canCreate(user: User, note: Note): Promise<boolean> {
    return this.spacePolicy.canAccessSpace(user, note.spaceId);
  }

  async canRead(user: User, note: Note): Promise<boolean> {
    return this.spacePolicy.canAccessSpace(user, note.spaceId);
  }

  async canUpdate(user: User, note: Note): Promise<boolean> {
    return this.spacePolicy.canAccessSpace(user, note.spaceId);
  }

  async canDelete(user: User, note: Note): Promise<boolean> {
    return this.spacePolicy.canAccessSpace(user, note.spaceId);
  }
}
