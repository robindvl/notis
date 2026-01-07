import { DomainException } from './base.exception';

export class EntityNotFoundException extends DomainException {
  constructor(entityName: string, id: string) {
    super(`${entityName} with ID ${id} not found`);
  }
}

export class NoteNotFoundException extends EntityNotFoundException {
  constructor(id: string) {
    super('Note', id);
  }
}

export class SpaceNotFoundException extends EntityNotFoundException {
  constructor(id: string) {
    super('Space', id);
  }
}

