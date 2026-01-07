import { Injectable, ForbiddenException } from '@nestjs/common';
import { Space, SpaceRepository, SpaceNotFoundException } from '@repo/domain';
import { SpacePolicy } from '../space.policy';
import { UserContextService } from '../../auth/user-context.service';

@Injectable()
export class GetSpaceUseCase {
  constructor(
    private readonly repository: SpaceRepository,
    private readonly spacePolicy: SpacePolicy,
    private readonly userContext: UserContextService,
  ) {}

  async execute(id: string): Promise<Space> {
    const space = await this.repository.findById(id);
    if (!space) {
      throw new SpaceNotFoundException(id);
    }

    const user = this.userContext.getUser();
    if (!(await this.spacePolicy.canRead(user, space))) {
      throw new ForbiddenException(`You don't have access to this space`);
    }

    return space;
  }
}
