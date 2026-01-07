import { SpaceRepository } from '@repo/domain';

export async function seedSpaces(spaceRepo: SpaceRepository) {
  const space = await spaceRepo.create({
    name: 'Основное пространство',
    img: '🏢'
  });
  console.log(`Created Space: ${space.name} (${space.id})`);
  return space;
}

