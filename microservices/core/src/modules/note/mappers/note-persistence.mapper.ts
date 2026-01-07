import { Note as NoteDomain } from '@repo/domain';
import { NoteEntity } from '../entities/note.entity';

export class NotePersistenceMapper {
  static toDomain(entity: NoteEntity): NoteDomain {
    return {
      id: entity.id,
      title: entity.title,
      body: entity.body ?? undefined,
      emoji: entity.emoji ?? undefined,
      type: entity.type,
      parentId: entity.parentId ?? undefined,
      sectionId: entity.sectionId ?? undefined,
      spaceId: entity.spaceId,
      content: (entity.content as Record<string, unknown>) ?? undefined,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  static toDomainArray(entities: NoteEntity[]): NoteDomain[] {
    return entities.map((entity) => this.toDomain(entity));
  }

  // Для создания/обновления мы обычно используем DTO, но если нужно превратить
  // полный доменный объект обратно в Entity:
  static toPersistence(domain: NoteDomain): NoteEntity {
    const entity = new NoteEntity();
    entity.id = domain.id;
    entity.title = domain.title;
    entity.body = domain.body;
    entity.emoji = domain.emoji;
    entity.type = domain.type;
    entity.parentId = domain.parentId;
    entity.sectionId = domain.sectionId;
    entity.spaceId = domain.spaceId;
    entity.content = domain.content;
    entity.createdAt = domain.createdAt;
    entity.updatedAt = domain.updatedAt;
    return entity;
  }
}
