import { Injectable, BadRequestException, ForbiddenException } from '@nestjs/common';
import { Note, NoteRepository } from '@repo/domain';
import { SpacePolicy } from '../../space/space.policy';
import { UserContextService } from '../../auth/user-context.service';

@Injectable()
export class GetNotesUseCase {
  constructor(
    private readonly repository: NoteRepository,
    private readonly spacePolicy: SpacePolicy,
    private readonly userContext: UserContextService,
  ) {}

  async execute(
    spaceId: string | undefined,
    sectionId: string | undefined,
    parentId: string | undefined,
  ): Promise<Note[]> {
    const user = this.userContext.getUser();

    if (spaceId) {
      if (!(await this.spacePolicy.canAccessSpace(user, spaceId))) {
        throw new ForbiddenException(`You don't have access to space ${spaceId}`);
      }
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
