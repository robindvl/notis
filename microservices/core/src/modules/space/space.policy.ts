import { Injectable } from '@nestjs/common';
import { User, Space } from '@repo/domain';
import { IPolicy } from '../auth/policy.interface';

@Injectable()
export class SpacePolicy implements IPolicy<Space> {
  async canCreate(user: User, space: Space): Promise<boolean> {
    // Basic implementation: any authenticated user can create a space
    return !!user;
  }

  async canRead(user: User, space: Space): Promise<boolean> {
    // For now, allow reading if user exists
    // In a real app, check if user is a member of the space
    return !!user;
  }

  async canUpdate(user: User, space: Space): Promise<boolean> {
    // In a real app, check if user is an admin/owner of the space
    return !!user;
  }

  async canDelete(user: User, space: Space): Promise<boolean> {
    // In a real app, check if user is the owner of the space
    return !!user;
  }

  /**
   * Special check for spaceId access when we don't have the full entity yet
   */
  async canAccessSpace(user: User, spaceId: string): Promise<boolean> {
    // In a real app, check memberships table
    return !!user && !!spaceId;
  }
}
