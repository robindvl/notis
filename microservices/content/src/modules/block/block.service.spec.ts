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
    blocks = await handleResult(await service.blocksGet());
  });

  it('Сервис определен', () => {
    expect(service).toBeDefined();
  });

  describe('Получение списка блоков', () => {
    it('Полученный результат является массивом', () => {
      expect(Array.isArray(blocks)).toBeTruthy();
    });

    it('Первый элемент списка имеет нужные поля', () => {
      if (blocks.length === 0) {
        throw new Error('Список блоков пуст');
      }

      const firstBlock = blocks[0];
      const expectedBlockFields = {
        id: 1,
        name: '',
      } satisfies Block;

      validateObject(firstBlock, expectedBlockFields);
    });
  });

  describe('Добавить новый блок', () => {
    const newBlock: BlockCreate = {
      name: 'Блок New',
    };

    let newBlocks: Block[];

    beforeEach(async () => {
      await service.blocksPost(newBlock);
      newBlocks = await handleResult(await service.blocksGet());
    });

    it('Список стал больше', () => {
      expect(newBlocks.length).toBe(blocks.length + 1);
    });

    it('Новый блок присутствует в списке', () => {
      const newBlockInList = newBlocks.find(
        (block) => block.name === 'Блок New',
      );
      expect(newBlockInList).toBeDefined();
      expect(newBlockInList?.id).toBeDefined();
    });

    it('Структура нового блока корректна', () => {
      const expectedBlockFields = {
        id: 1,
        name: '',
      } satisfies Block;

      const newBlockInList = newBlocks.find(
        (block) => block.name === 'Блок New',
      );
      if (!newBlockInList) {
        throw new Error('Элемент не найден');
      }

      validateObject(newBlockInList, expectedBlockFields);
    });
  });

  describe('Обновить блок', () => {
    const blockUpdate = {
      name: `Block ${Math.round(Math.random() * 1000)}`,
    };

    let updatedBlocks: Block[];

    beforeEach(async () => {
      if (!blocks[0] || !blocks[0].id) {
        throw new Error('Нет блока для обновления');
      }

      await service.blocksIdPost(blocks[0].id, blockUpdate);

      updatedBlocks = await handleResult(await service.blocksGet());
    });

    it('Блок был корректно изменен', () => {
      const prevBlock = blocks[0];
      const updatedBlock = updatedBlocks.find(
        (block) => block.id === prevBlock.id,
      );

      if (!updatedBlock) {
        throw new Error('Обновленный блок не найден');
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
