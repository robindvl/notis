import { Injectable } from '@nestjs/common';
import { Note, NoteCreateDto, NoteRepository } from '@repo/domain';

@Injectable()
export class CreateNoteUseCase {
  constructor(private readonly repository: NoteRepository) {}

  async execute(dto: NoteCreateDto): Promise<Note> {
    // Здесь можно добавить доменную логику, валидацию или проверку прав
    return this.repository.create(dto);
  }
}

