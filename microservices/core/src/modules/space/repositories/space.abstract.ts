import { Space, SpaceCreate, SpaceUpdate } from '../../../@generated/models';
import { Repository } from '../../../interfaces/repository.abstract';

export abstract class SpaceRepository extends Repository<
  Space,
  SpaceCreate,
  SpaceUpdate
> {}
