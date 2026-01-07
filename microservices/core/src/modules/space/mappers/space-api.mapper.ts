import { Space as SpaceDomain, SpaceCreateDto, SpaceUpdateDto } from '@repo/domain';
import { SpaceResponseDto } from '../space.dto';
import typia from 'typia';

export class SpaceApiMapper {
  static toResponse(domain: SpaceDomain): SpaceResponseDto {
    const response: SpaceResponseDto = {
      ...domain,
      createdAt: domain.createdAt.toISOString(),
    };
    return typia.assert<SpaceResponseDto>(response);
  }

  static toResponseArray(domainArray: SpaceDomain[]): SpaceResponseDto[] {
    const responseArray = domainArray.map(domain => ({
      ...domain,
      createdAt: domain.createdAt.toISOString(),
    }));
    return typia.assert<SpaceResponseDto[]>(responseArray);
  }

  static toDomain(dto: SpaceCreateDto): SpaceCreateDto {
    return typia.assert<SpaceCreateDto>(dto);
  }

  static toDomainUpdate(dto: SpaceUpdateDto): SpaceUpdateDto {
    return typia.assert<SpaceUpdateDto>(dto);
  }
}
