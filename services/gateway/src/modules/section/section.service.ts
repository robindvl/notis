import { Injectable } from '@nestjs/common';
import { Section, SectionRepository } from '@repo/domain';
import { faker } from '@faker-js/faker/locale/ru';
import { uuidv7 } from 'uuidv7';

@Injectable()
export class SectionService {
  constructor(
    private readonly sectionRepository: SectionRepository,
  ) {}

  async list(): Promise<Section[]> {
    return this.sectionRepository.findAll();
  }

  async create(name: string): Promise<Section> {
    const section: Section = {
      id: uuidv7(),
      name: name || faker.book.title(),
      notes: [],
      space_id: uuidv7(),
    };
    return this.sectionRepository.create(section);
  }
}

