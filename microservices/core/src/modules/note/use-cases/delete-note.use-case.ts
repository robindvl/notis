import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { NoteRepository } from '@repo/domain';
import { NotePolicy } from '../note.policy';
import { UserContextService } from '../../auth/user-context.service';

@Injectable()
export class DeleteNoteUseCase {
  constructor(
    private readonly repository: NoteRepository,
    private readonly notePolicy: NotePolicy,
    private readonly userContext: UserContextService,
  ) {}

  async execute(id: string): Promise<void> {
    const note = await this.repository.findById(id);
    if (!note) {
      throw new NotFoundException(`Note with ID ${id} not found`);
    }

    const user = this.userContext.getUser();
    if (!(await this.notePolicy.canDelete(user, note))) {
      throw new ForbiddenException(`You don't have access to delete this note`);
    }

    return this.repository.delete(id);
  }
}
