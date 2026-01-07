import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { NoteApi } from '../../@generated/api';
import { Note as NoteModel } from '../../@generated/models';
import { NoteCreateDto, Note as NoteDomain, NoteRepository, NoteUpdateDto } from '@repo/domain';
import { NoteResponseDto } from './note.dto';

@Injectable()
export class NoteService implements NoteApi {
  constructor(private readonly repository: NoteRepository) {}

  async getNotes(
    spaceId: string | undefined,
    sectionId: string | undefined,
    parentId: string | undefined,
    _request: Request,
  ): Promise<NoteModel[]> {
    let notes: NoteDomain[];

    if (spaceId) {
      notes = await this.repository.findBySpaceId(spaceId);
    } else if (sectionId) {
      notes = await this.repository.findBySectionId(sectionId);
    } else if (parentId) {
      notes = await this.repository.findByParentId(parentId);
    } else {
      throw new BadRequestException(
        'At least one filter (spaceId, sectionId, or parentId) must be provided',
      );
    }

    return NoteResponseDto.fromDomainArray(notes);
  }

  async createNote(noteCreate: NoteCreateDto, _request: Request): Promise<NoteModel> {
    const note = await this.repository.create(noteCreate);
    return NoteResponseDto.fromDomain(note);
  }

  async getNote(id: string, _request: Request): Promise<NoteModel> {
    const note = await this.repository.findById(id);
    if (!note) {
      throw new NotFoundException(`Note with ID ${id} not found`);
    }
    return NoteResponseDto.fromDomain(note);
  }

  async updateNote(
    id: string,
    updateData: NoteUpdateDto,
    _request: Request,
  ): Promise<NoteModel> {
    const note = await this.repository.update(id, updateData);
    return NoteResponseDto.fromDomain(note);
  }

  async deleteNote(id: string, _request: Request): Promise<void> {
    await this.repository.delete(id);
  }
}

