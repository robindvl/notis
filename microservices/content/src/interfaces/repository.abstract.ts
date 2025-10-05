export abstract class Repository<GEntity, GCreate, GUpdate> {
  abstract create(entity: GCreate): Promise<GEntity>;
  abstract update(id: number, entity: GUpdate): Promise<GEntity>;
  abstract find(criteria?: any): Promise<GEntity[]>;
  abstract findOne(id: number): Promise<GEntity | undefined>;
  abstract delete(id: number): Promise<GEntity | undefined>;
}
