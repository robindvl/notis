import { Space } from '../entities/space';

export type SpaceCreateDto = Omit<Space, 'id' | 'createdAt'>;

export type SpaceUpdateDto = Partial<SpaceCreateDto>;

