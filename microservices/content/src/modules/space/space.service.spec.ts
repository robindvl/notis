import { Test, TestingModule } from '@nestjs/testing';
import { Space, SpaceCreate } from 'src/@generated/models';

import { SpacesService } from './space.service';
import { handleResult, validateObject } from '../../utils/testing';
import { SpaceRepository } from './repositories/space.abstract';
import { SpacesMockRepository } from './repositories/space.mock';

describe('SpacesService', () => {
  let service: SpacesService;
  let elements: Space[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SpacesService,
        {
          provide: SpaceRepository,
          useClass: SpacesMockRepository,
        },
      ],
    }).compile();

    service = module.get<SpacesService>(SpacesService);
    elements = await handleResult(await service.getSpaces());
  });

  it('Сервис определен', () => {
    expect(service).toBeDefined();
  });

  describe('Получение список элементов', () => {
    it('Полученный результат является массивом', () => {
      expect(Array.isArray(elements)).toBeTruthy();
    });

    it('Первый элемент списка имеет нужные поля', () => {
      if (elements.length === 0) {
        throw new Error('Список элементов пуст');
      }

      const firstElement = elements[0];
      const expected = {
        id: 1,
        name: '',
      };

      validateObject(firstElement, expected);
    });
  });

  describe('Добавить новый элемент', () => {
    const newElement: SpaceCreate = {
      name: 'New element',
    };

    let newElements: Space[];

    beforeEach(async () => {
      await service.createSpace(newElement);
      newElements = await handleResult(await service.getSpaces());
    });

    it('Список стал больше', () => {
      expect(newElements.length).toBe(elements.length + 1);
    });

    it('Новый элемент присутствует в списке', () => {
      const newElementInList = newElements.find(
        (block) => block.name === 'New element',
      );
      expect(newElementInList).toBeDefined();
      expect(newElementInList?.id).toBeDefined();
    });

    it('Структура нового элемента корректна', () => {
      const newElementInList = newElements.find(
        (block) => block.name === 'New element',
      );
      if (!newElementInList) {
        throw new Error('Элемент не найден');
      }

      const expected = {
        id: 1,
        name: '',
      };

      validateObject(newElementInList, expected);
    });
  });

  describe('Обновить элемент', () => {
    const elementUpdate = {
      name: `New element ${Math.round(Math.random() * 1000)}`,
    };

    let updatedElements: Space[];

    beforeEach(async () => {
      if (!elements[0] || !elements[0].id) {
        throw new Error('Нет элемента для обновления');
      }

      await service.updateSpace(elements[0].id, elementUpdate);

      updatedElements = await handleResult(await service.getSpaces());
    });

    it('Элемент был корректно изменен', () => {
      const prevElement = elements[0];
      const updatedElement = updatedElements.find(
        (element) => element.id === prevElement.id,
      );

      if (!updatedElement) {
        throw new Error('Обновленный элемент не найден');
      }

      expect(prevElement.id).toBe(updatedElement.id);
      expect(prevElement.name).not.toBe(updatedElement.name);
      expect(updatedElement.name).toBe(elementUpdate.name);

      const expected = {
        id: 1,
        name: '',
      };

      validateObject(updatedElement, expected);
    });
  });
});
