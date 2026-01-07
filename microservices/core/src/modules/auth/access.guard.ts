import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { UserContextService } from './user-context.service';

@Injectable()
export class AccessGuard implements CanActivate {
  constructor(private readonly userContext: UserContextService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (!this.userContext.isAuthenticated()) {
      throw new UnauthorizedException('User not authenticated');
    }
    return true;
  }
}
