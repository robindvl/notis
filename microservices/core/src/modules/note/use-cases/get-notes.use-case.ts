import { Injectable, BadRequestException } from '@nestjs/common';
import { Note, NoteRepository } from '@repo/domain';

@Injectable()
export class GetNotesUseCase {
  constructor(private readonly repository: NoteRepository) {}

  async execute(
    spaceId: string | undefined,
    sectionId: string | undefined,
    parentId: string | undefined,
  ): Promise<Note[]> {
    if (spaceId) {
      return this.repository.findBySpaceId(spaceId);
    } else if (sectionId) {
      return this.repository.findBySectionId(sectionId);
    } else if (parentId) {
      return this.repository.findByParentId(parentId);
    } else {
      throw new BadRequestException(
        'At least one filter (spaceId, sectionId, or parentId) must be provided',
      );
    }
  }
}

