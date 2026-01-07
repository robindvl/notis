import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SpaceRepository, NoteRepository } from '@repo/domain';
import { seedSpaces } from './modules/space/space.seed';
import { seedNotes } from './modules/note/note.seed';
import { DataSource } from 'typeorm';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  
  const spaceRepo = app.get(SpaceRepository);
  const noteRepo = app.get(NoteRepository);
  const dataSource = app.get(DataSource);

  console.log('🧹 Clearing old data...');
  await dataSource.query('TRUNCATE TABLE notes, spaces RESTART IDENTITY CASCADE');

  console.log('🌱 Starting modular seeding...');

  const spaces = await seedSpaces(spaceRepo);

  for (const space of spaces) {
    console.log(`\n📄 Seeding notes for space: ${space.name}...`);
    await seedNotes(noteRepo, space);
  }

  console.log('\n✅ Seeding finished!');
  await app.close();
}

bootstrap().catch(err => {
  console.error('❌ Seeding failed:', err);
  process.exit(1);
});
