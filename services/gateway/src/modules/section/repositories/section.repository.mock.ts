import { Injectable } from '@nestjs/common';
import { Section, SectionRepository } from '@repo/domain';
import { faker } from '@faker-js/faker/locale/ru';
import { uuidv7 } from 'uuidv7';

@Injectable()
export class SectionRepositoryMock extends SectionRepository {
  private sections: Section[] = [
    {
      id: uuidv7(),
      name: 'Документация',
      space_id: uuidv7(),
      notes: [
        {
          id: uuidv7(),
          name: faker.lorem.paragraph(),
          emoji: faker.internet.emoji(),
        },
        {
          id: uuidv7(),
          name: faker.lorem.paragraph(),
          emoji: faker.internet.emoji(),
        },
        {
          id: uuidv7(),
          name: faker.lorem.paragraph(),
          emoji: faker.internet.emoji(),
        },
        {
          id: uuidv7(),
          name: faker.lorem.paragraph(),
          emoji: faker.internet.emoji(),
        },
        {
          id: uuidv7(),
          name: faker.lorem.paragraph(),
          emoji: faker.internet.emoji(),
        },
      ],
    },
    { id: uuidv7(), space_id: uuidv7(), name: 'База данных', notes: [] },
    { id: uuidv7(), space_id: uuidv7(), name: 'Финансы', notes: [] },
  ];

  async findAll(): Promise<Section[]> {
    return this.sections;
  }

  async findById(id: string): Promise<Section | null> {
    return this.sections.find((s) => s.id === id) || null;
  }

  async create(section: Section): Promise<Section> {
    this.sections.push(section);
    return section;
  }

  async update(id: string, section: Partial<Section>): Promise<Section> {
    const index = this.sections.findIndex((s) => s.id === id);
    if (index === -1) throw new Error('Section not found');
    const updatedSection = { ...this.sections[index], ...section, id } as Section;
    this.sections[index] = updatedSection;
    return updatedSection;
  }

  async delete(id: string): Promise<void> {
    this.sections = this.sections.filter((s) => s.id !== id);
  }
}

