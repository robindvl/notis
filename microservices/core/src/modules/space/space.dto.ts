import { Space as SpaceModel } from '../../@generated/models';

export class SpaceResponseDto implements SpaceModel {
  id: string;
  name: string;
  img?: string;
  createdAt: string;
}
