import { Injectable, ForbiddenException } from '@nestjs/common';
import { Space, SpaceCreateDto, SpaceRepository } from '@repo/domain';
import { SpacePolicy } from '../space.policy';
import { UserContextService } from '../../auth/user-context.service';
import typia from 'typia';

@Injectable()
export class CreateSpaceUseCase {
  constructor(
    private readonly repository: SpaceRepository,
    private readonly spacePolicy: SpacePolicy,
    private readonly userContext: UserContextService,
  ) {}

  async execute(dto: SpaceCreateDto): Promise<Space> {
    typia.assert<SpaceCreateDto>(dto);

    const user = this.userContext.getUser();
    if (!(await this.spacePolicy.canCreate(user, dto as Space))) {
      throw new ForbiddenException(`You don't have access to create spaces`);
    }

    return this.repository.create(dto);
  }
}
