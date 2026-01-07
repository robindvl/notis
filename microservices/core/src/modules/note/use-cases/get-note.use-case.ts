import { Injectable, ForbiddenException } from '@nestjs/common';
import { Note, NoteRepository, NoteNotFoundException } from '@repo/domain';
import { NotePolicy } from '../note.policy';
import { UserContextService } from '../../auth/user-context.service';

@Injectable()
export class GetNoteUseCase {
  constructor(
    private readonly repository: NoteRepository,
    private readonly notePolicy: NotePolicy,
    private readonly userContext: UserContextService,
  ) {}

  async execute(id: string): Promise<Note> {
    const note = await this.repository.findById(id);
    if (!note) {
      throw new NoteNotFoundException(id);
    }

    const user = this.userContext.getUser();
    if (!(await this.notePolicy.canRead(user, note))) {
      throw new ForbiddenException(`You don't have access to this note`);
    }

    return note;
  }
}
