import { Note, NoteRepository, Space, NoteType } from '@repo/domain';
import { faker } from '@faker-js/faker';

export async function seedNotes(noteRepo: NoteRepository, space: Space) {
  // Create Sections
  const sections: Note[] = [];
  const emojis = ['📚', '🗄️', '💡', '🎯', '🛠️'];
  
  for (let i = 0; i < 3; i++) {
    const section = await noteRepo.create({
      title: faker.lorem.words(2),
      type: NoteType.Section,
      spaceId: space.id,
      emoji: emojis[i % emojis.length],
      content: {}
    });
    sections.push(section);
    console.log(`  Created Section: ${section.title}`);
  }

  // Create Notes in Sections
  for (const section of sections) {
    for (let i = 0; i < 2; i++) {
      const note = await noteRepo.create({
        title: faker.lorem.sentence(3).replace('.', ''),
        body: faker.lorem.paragraphs(1),
        type: NoteType.Note,
        spaceId: space.id,
        sectionId: section.id,
        emoji: '📝',
        content: {}
      });
      console.log(`    Created Note: ${note.title}`);
    }
  }

  // Create some root notes
  for (let i = 0; i < 2; i++) {
    const note = await noteRepo.create({
      title: faker.lorem.sentence(2).replace('.', ''),
      body: faker.lorem.paragraphs(1),
      type: NoteType.Note,
      spaceId: space.id,
      emoji: '🌱',
      content: {}
    });
    console.log(`  Created Root Note: ${note.title}`);
  }
}

