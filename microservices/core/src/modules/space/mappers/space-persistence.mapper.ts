import { Space as SpaceDomain } from '@repo/domain';
import { SpaceEntity } from '../entities/space.entity';

export class SpacePersistenceMapper {
  static toDomain(entity: SpaceEntity): SpaceDomain {
    return {
      id: entity.id,
      name: entity.name,
      img: entity.img ?? undefined,
      createdAt: entity.createdAt,
    };
  }

  static toDomainArray(entities: SpaceEntity[]): SpaceDomain[] {
    return entities.map((entity) => this.toDomain(entity));
  }

  static toPersistence(domain: SpaceDomain): SpaceEntity {
    const entity = new SpaceEntity();
    entity.id = domain.id;
    entity.name = domain.name;
    entity.img = domain.img;
    entity.createdAt = domain.createdAt;
    return entity;
  }
}
