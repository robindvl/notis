import { Injectable } from '@nestjs/common';

import { Block } from 'src/@generated/models';
import { BlockRepository } from './block.abstract';

@Injectable()
export class BlocksMockRepository implements BlockRepository {
  private blocks: Block[] = [];

  constructor() {
    const newId1 = Math.round(Math.random() * 1000);
    const newId2 = Math.round(Math.random() * 1000);

    this.blocks = [
      { id: newId1, name: `Блок ${newId1}` },
      { id: newId2, name: `Блок ${newId2}` },
    ];
  }

  find(): Promise<Block[]> {
    return Promise.resolve(this.blocks);
  }

  create(entity: Block): Promise<Block> {
    const newId = Math.round(Math.random() * 1000);
    const block = {
      id: newId,
      name: entity.name || '',
    };
    this.blocks.push(block);
    return Promise.resolve(block);
  }

  update(id: number, entity: Block): Promise<Block> {
    const block = {
      id: id,
      name: entity.name || '',
    };
    const findIndexBlock = this.blocks.findIndex((block) => block.id === id);
    this.blocks[findIndexBlock] = block;
    return Promise.resolve(block);
  }

  findOne(id: any): Promise<Block | undefined> {
    return Promise.resolve(this.blocks.find((block) => block.id === id));
  }

  async delete(id: any): Promise<Block | undefined> {
    const block = await this.findOne(id);
    if (block) {
      this.blocks = this.blocks.filter((b) => b.id !== id);
    }
    return Promise.resolve(block);
  }
}
