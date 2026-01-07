import { Injectable } from '@nestjs/common';
import { NoteRepository } from '@repo/domain';

@Injectable()
export class DeleteNoteUseCase {
  constructor(private readonly repository: NoteRepository) {}

  async execute(id: string): Promise<void> {
    return this.repository.delete(id);
  }
}

