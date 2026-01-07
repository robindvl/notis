import { Injectable, ForbiddenException } from '@nestjs/common';
import { Note, NoteCreateDto, NoteRepository } from '@repo/domain';
import { NotePolicy } from '../note.policy';
import { UserContextService } from '../../auth/user-context.service';
import typia from 'typia';

@Injectable()
export class CreateNoteUseCase {
  constructor(
    private readonly repository: NoteRepository,
    private readonly notePolicy: NotePolicy,
    private readonly userContext: UserContextService,
  ) {}

  async execute(dto: NoteCreateDto): Promise<Note> {
    typia.assert<NoteCreateDto>(dto);

    const user = this.userContext.getUser();

    if (!(await this.notePolicy.canCreate(user, dto as Note))) {
      throw new ForbiddenException(`You don't have access to create notes in this space`);
    }

    return this.repository.create(dto);
  }
}
