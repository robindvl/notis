import { Transform, plainToInstance } from 'class-transformer';
import { Space as SpaceModel } from '../../@generated/models';
import { Space as SpaceDomain } from '@repo/domain';

export class SpaceResponseDto implements SpaceModel {
  id: string;
  name: string;
  img: string;

  @Transform(({ value }) => (value instanceof Date ? value.toISOString() : value))
  createdAt: string;

  static fromDomain(domain: SpaceDomain): SpaceResponseDto {
    return plainToInstance(SpaceResponseDto, domain);
  }

  static fromDomainArray(domainArray: SpaceDomain[]): SpaceResponseDto[] {
    return plainToInstance(SpaceResponseDto, domainArray);
  }
}