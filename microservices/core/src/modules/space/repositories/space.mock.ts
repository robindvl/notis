import { Injectable } from '@nestjs/common';

import { Space } from 'src/@generated/models';
import { SpaceRepository } from './space.abstract';

@Injectable()
export class SpacesMockRepository implements SpaceRepository {
  private spaces: Space[] = [];

  constructor() {
    const newId1 = Math.round(Math.random() * 1000);
    const newId2 = Math.round(Math.random() * 1000);

    this.spaces = [
      { id: newId1, name: `Space ${newId1}` },
      { id: newId2, name: `Space ${newId2}` },
    ];
  }

  find(): Promise<Space[]> {
    return Promise.resolve(this.spaces);
  }

  create(entity: Space): Promise<Space> {
    const newId = Math.round(Math.random() * 1000);
    const element = {
      id: newId,
      name: entity.name || '',
    };
    this.spaces.push(element);
    return Promise.resolve(element);
  }

  update(id: number, entity: Space): Promise<Space> {
    const newElement = {
      id: Number(id),
      name: entity.name || '',
    };
    const findIndex = this.spaces.findIndex(
      (element) => element.id === Number(id),
    );
    this.spaces[findIndex] = newElement;
    return Promise.resolve(newElement);
  }

  findOne(id: number): Promise<Space | undefined> {
    return Promise.resolve(
      this.spaces.find((element) => element.id === Number(id)),
    );
  }

  async delete(id: number): Promise<Space | undefined> {
    const element = await this.findOne(id);
    if (element) {
      this.spaces = this.spaces.filter((b) => b.id !== Number(id));
    }
    return Promise.resolve(element);
  }
}
