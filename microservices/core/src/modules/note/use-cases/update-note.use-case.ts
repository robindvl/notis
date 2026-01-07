import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { Note, NoteUpdateDto, NoteRepository } from '@repo/domain';
import { NotePolicy } from '../note.policy';
import { UserContextService } from '../../auth/user-context.service';
import typia from 'typia';

@Injectable()
export class UpdateNoteUseCase {
  constructor(
    private readonly repository: NoteRepository,
    private readonly notePolicy: NotePolicy,
    private readonly userContext: UserContextService,
  ) {}

  async execute(id: string, dto: NoteUpdateDto): Promise<Note> {
    typia.assert<NoteUpdateDto>(dto);

    const note = await this.repository.findById(id);
    if (!note) {
      throw new NotFoundException(`Note with ID ${id} not found`);
    }

    const user = this.userContext.getUser();
    if (!(await this.notePolicy.canUpdate(user, note))) {
      throw new ForbiddenException(`You don't have access to update this note`);
    }

    return this.repository.update(id, dto);
  }
}
