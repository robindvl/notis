import { Test, TestingModule } from '@nestjs/testing';
import { Block, BlockCreate } from 'src/@generated/models';

import { BlocksService } from './block.service';
import { handleResult, validateObject } from '../../utils/testing';
import { BlockRepository } from './repositories/block.abstract';
import { BlocksMockRepository } from './repositories/block.mock';

describe('BlocksService', () => {
  let service: BlocksService;
  let blocks: Block[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BlocksService,
        {
          provide: BlockRepository,
          useClass: BlocksMockRepository,
        },
      ],
    }).compile();

    service = module.get<BlocksService>(BlocksService);
    blocks = await handleResult(await service.getBlocks());
  });

  it('Сервис определен', () => {
    expect(service).toBeDefined();
  });

  describe('Получение список элементов', () => {
    it('Полученный результат является массивом', () => {
      expect(Array.isArray(blocks)).toBeTruthy();
    });

    it('Первый элемент списка имеет нужные поля', () => {
      if (blocks.length === 0) {
        throw new Error('Список элементов пуст');
      }

      const firstBlock = blocks[0];
      const expectedBlockFields = {
        id: 1,
        name: '',
      } satisfies Block;

      validateObject(firstBlock, expectedBlockFields);
    });
  });

  describe('Добавить новый элемент', () => {
    const newBlock: BlockCreate = {
      name: 'New element',
    };

    let newBlocks: Block[];

    beforeEach(async () => {
      await service.createBlock(newBlock);
      newBlocks = await handleResult(await service.getBlocks());
    });

    it('Список стал больше', () => {
      expect(newBlocks.length).toBe(blocks.length + 1);
    });

    it('Новый элемент присутствует в списке', () => {
      const newBlockInList = newBlocks.find(
        (block) => block.name === 'New element',
      );
      expect(newBlockInList).toBeDefined();
      expect(newBlockInList?.id).toBeDefined();
    });

    it('Структура нового элемента корректна', () => {
      const expectedBlockFields = {
        id: 1,
        name: '',
      } satisfies Block;

      const newBlockInList = newBlocks.find(
        (block) => block.name === 'New element',
      );
      if (!newBlockInList) {
        throw new Error('Элемент не найден');
      }

      validateObject(newBlockInList, expectedBlockFields);
    });
  });

  describe('Обновить элемент', () => {
    const blockUpdate = {
      name: `Block ${Math.round(Math.random() * 1000)}`,
    };

    let updatedBlocks: Block[];

    beforeEach(async () => {
      if (!blocks[0] || !blocks[0].id) {
        throw new Error('Нет элемента для обновления');
      }

      await service.updateBlock(blocks[0].id, blockUpdate);

      updatedBlocks = await handleResult(await service.getBlocks());
    });

    it('Элемент был корректно изменен', () => {
      const prevBlock = blocks[0];
      const updatedBlock = updatedBlocks.find(
        (block) => block.id === prevBlock.id,
      );

      if (!updatedBlock) {
        throw new Error('Обновленный элемент не найден');
      }

      expect(prevBlock.id).toBe(updatedBlock.id);
      expect(prevBlock.name).not.toBe(updatedBlock.name);
      expect(updatedBlock.name).toBe(blockUpdate.name);

      const expectedBlockFields = {
        id: 1,
        name: '',
      } satisfies Block;

      validateObject(updatedBlock, expectedBlockFields);
    });
  });
});
