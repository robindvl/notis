import { Injectable } from '@nestjs/common';
import { SpaceApi } from '../../@generated/api';
import { Space as SpaceModel } from '../../@generated/models';
import { SpaceCreateDto, SpaceUpdateDto } from '@repo/domain';
import { CreateSpaceUseCase } from './use-cases/create-space.use-case';
import { UpdateSpaceUseCase } from './use-cases/update-space.use-case';
import { GetSpaceUseCase } from './use-cases/get-space.use-case';
import { DeleteSpaceUseCase } from './use-cases/delete-space.use-case';
import { GetSpacesUseCase } from './use-cases/get-spaces.use-case';
import { SpaceApiMapper } from './mappers/space-api.mapper';

@Injectable()
export class SpaceService implements SpaceApi {
  constructor(
    private readonly createSpaceUseCase: CreateSpaceUseCase,
    private readonly updateSpaceUseCase: UpdateSpaceUseCase,
    private readonly getSpaceUseCase: GetSpaceUseCase,
    private readonly deleteSpaceUseCase: DeleteSpaceUseCase,
    private readonly getSpacesUseCase: GetSpacesUseCase,
  ) {}

  async getSpaces(_request: Request): Promise<SpaceModel[]> {
    const spaces = await this.getSpacesUseCase.execute();
    return SpaceApiMapper.toResponseArray(spaces);
  }

  async createSpace(
    spaceCreate: SpaceCreateDto,
    _request: Request,
  ): Promise<SpaceModel> {
    const space = await this.createSpaceUseCase.execute(SpaceApiMapper.toDomain(spaceCreate));
    return SpaceApiMapper.toResponse(space);
  }

  async getSpace(id: string, _request: Request): Promise<SpaceModel> {
    const space = await this.getSpaceUseCase.execute(id);
    return SpaceApiMapper.toResponse(space);
  }

  async updateSpace(
    id: string,
    spaceUpdate: SpaceUpdateDto,
    _request: Request,
  ): Promise<SpaceModel> {
    const space = await this.updateSpaceUseCase.execute(id, SpaceApiMapper.toDomainUpdate(spaceUpdate));
    return SpaceApiMapper.toResponse(space);
  }

  async deleteSpace(id: string, _request: Request): Promise<void> {
    await this.deleteSpaceUseCase.execute(id);
  }
}
