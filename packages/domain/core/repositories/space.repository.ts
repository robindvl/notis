import { Space } from '../entities/space';
import { SpaceCreateDto, SpaceUpdateDto } from '../dto/space.dto';

export abstract class SpaceRepository {
  abstract findAll(): Promise<Space[]>;
  abstract findById(id: string): Promise<Space | null>;
  abstract findByOwnerId(ownerId: string): Promise<Space[]>;
  abstract create(space: SpaceCreateDto): Promise<Space>;
  abstract update(id: string, space: SpaceUpdateDto): Promise<Space>;
  abstract delete(id: string): Promise<void>;
}
