import { Note as NoteDomain, NoteCreateDto, NoteUpdateDto } from '@repo/domain';
import { NoteResponseDto } from '../note.dto';
import typia from 'typia';

export class NoteApiMapper {
  static toResponse(domain: NoteDomain): NoteResponseDto {
    const response: NoteResponseDto = {
      ...domain,
      type: domain.type as any, // types match at runtime
      createdAt: domain.createdAt.toISOString(),
      updatedAt: domain.updatedAt.toISOString(),
    };
    return typia.assert<NoteResponseDto>(response);
  }

  static toResponseArray(domainArray: NoteDomain[]): NoteResponseDto[] {
    const responseArray = domainArray.map(domain => ({
      ...domain,
      type: domain.type as any,
      createdAt: domain.createdAt.toISOString(),
      updatedAt: domain.updatedAt.toISOString(),
    }));
    return typia.assert<NoteResponseDto[]>(responseArray);
  }

  static toDomain(dto: NoteCreateDto): NoteCreateDto {
    return typia.assert<NoteCreateDto>(dto);
  }

  static toDomainUpdate(dto: NoteUpdateDto): NoteUpdateDto {
    return typia.assert<NoteUpdateDto>(dto);
  }
}
