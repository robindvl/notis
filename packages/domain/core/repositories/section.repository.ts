import { Section } from '../entities/section';

export abstract class SectionRepository {
  abstract findAll(): Promise<Section[]>;
  abstract findById(id: string): Promise<Section | null>;
  abstract create(section: Section): Promise<Section>;
  abstract update(id: string, section: Partial<Section>): Promise<Section>;
  abstract delete(id: string): Promise<void>;
}
