import { SpaceRepository, Space } from '@repo/domain';
import { faker } from '@faker-js/faker';

export async function seedSpaces(spaceRepo: SpaceRepository) {
  const spaceConfigs = [
    { name: 'Личное пространство', img: '🏠' },
    { name: 'Рабочий проект', img: '🚀' },
    { name: 'Обучение', img: '🎓' },
    { name: 'Идеи', img: '💡' },
    { name: faker.commerce.department(), img: '📦' },
  ];

  const spaces: Space[] = [];
  for (const config of spaceConfigs) {
    const space = await spaceRepo.create({
      name: config.name,
      img: config.img
    });
    console.log(`Created Space: ${space.name} (${space.id})`);
    spaces.push(space);
  }
  
  return spaces;
}

