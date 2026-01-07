import { Injectable } from '@nestjs/common';
import { NoteApi } from '../../@generated/api';
import { Note as NoteModel, NoteCreate, NoteUpdate } from '../../@generated/models';
import { NoteCreateDto, NoteUpdateDto } from '@repo/domain';
import { NoteResponseDto } from './note.dto';
import { CreateNoteUseCase } from './use-cases/create-note.use-case';
import { UpdateNoteUseCase } from './use-cases/update-note.use-case';
import { GetNoteUseCase } from './use-cases/get-note.use-case';
import { DeleteNoteUseCase } from './use-cases/delete-note.use-case';
import { GetNotesUseCase } from './use-cases/get-notes.use-case';

@Injectable()
export class NoteService implements NoteApi {
  constructor(
    private readonly createNoteUseCase: CreateNoteUseCase,
    private readonly updateNoteUseCase: UpdateNoteUseCase,
    private readonly getNoteUseCase: GetNoteUseCase,
    private readonly deleteNoteUseCase: DeleteNoteUseCase,
    private readonly getNotesUseCase: GetNotesUseCase,
  ) {}

  async getNotes(
    spaceId: string | undefined,
    sectionId: string | undefined,
    parentId: string | undefined,
    _request: Request,
  ): Promise<NoteModel[]> {
    const notes = await this.getNotesUseCase.execute(spaceId, sectionId, parentId);
    return NoteResponseDto.fromDomainArray(notes);
  }

  async createNote(noteCreate: NoteCreate, _request: Request): Promise<NoteModel> {
    const note = await this.createNoteUseCase.execute(noteCreate as NoteCreateDto);
    return NoteResponseDto.fromDomain(note);
  }

  async getNote(id: string, _request: Request): Promise<NoteModel> {
    const note = await this.getNoteUseCase.execute(id);
    return NoteResponseDto.fromDomain(note);
  }

  async updateNote(
    id: string,
    updateData: NoteUpdate,
    _request: Request,
  ): Promise<NoteModel> {
    const note = await this.updateNoteUseCase.execute(id, updateData as NoteUpdateDto);
    return NoteResponseDto.fromDomain(note);
  }

  async deleteNote(id: string, _request: Request): Promise<void> {
    await this.deleteNoteUseCase.execute(id);
  }
}