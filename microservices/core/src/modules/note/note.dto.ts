import { Transform, plainToInstance } from 'class-transformer';
import { Note as NoteModel } from '../../@generated/models';
import { Note as NoteDomain } from '@repo/domain';

export class NoteResponseDto implements NoteModel {
  id: string;
  title: string;
  body?: string;
  emoji?: string;

  @Transform(({ value }) => {
    const mapping: Record<NoteDomain['type'], NoteModel.TypeEnum> = {
      note: NoteModel.TypeEnum.Note,
      section: NoteModel.TypeEnum.Section,
      paragraph: NoteModel.TypeEnum.Paragraph,
      note_task: NoteModel.TypeEnum.NoteTask,
    };
    return mapping[value as NoteDomain['type']];
  })
  type: NoteModel.TypeEnum;

  parentId?: string;
  sectionId?: string;
  spaceId: string;
  content?: Record<string, unknown>;

  @Transform(({ value }) => (value instanceof Date ? value.toISOString() : value))
  createdAt: string;

  @Transform(({ value }) => (value instanceof Date ? value.toISOString() : value))
  updatedAt: string;

  static fromDomain(domain: NoteDomain): NoteResponseDto {
    // plainToInstance превращает "голый" объект в экземпляр класса, 
    // применяя все декораторы @Transform
    return plainToInstance(NoteResponseDto, domain);
  }

  static fromDomainArray(domainArray: NoteDomain[]): NoteResponseDto[] {
    return plainToInstance(NoteResponseDto, domainArray);
  }
}

