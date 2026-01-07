import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note, NoteRepository } from '@repo/domain';
import { NoteEntity } from '../entities/note.entity';
import { uuidv7 } from 'uuidv7';

@Injectable()
export class NoteRepositoryTypeOrm extends NoteRepository {
  constructor(
    @InjectRepository(NoteEntity)
    private readonly repository: Repository<NoteEntity>,
  ) {
    super();
  }

  async findById(id: string): Promise<Note | null> {
    return this.repository.findOneBy({ id });
  }

  async findBySpaceId(spaceId: string): Promise<Note[]> {
    return this.repository.findBy({ spaceId });
  }

  async findBySectionId(sectionId: string): Promise<Note[]> {
    return this.repository.findBy({ sectionId });
  }

  async findByParentId(parentId: string): Promise<Note[]> {
    return this.repository.findBy({ parentId });
  }

  async create(note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>): Promise<Note> {
    const newNote = this.repository.create({
      ...note,
      id: uuidv7(),
    });
    return this.repository.save(newNote);
  }

  async update(id: string, note: Partial<Note>): Promise<Note> {
    await this.repository.update(id, note as any);
    const updated = await this.findById(id);
    if (!updated) throw new Error('Note not found');
    return updated;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async reorder(parentId: string, noteIds: string[]): Promise<void> {
    // Basic implementation for reorder if needed
    // In a real app, you'd likely have a 'position' column
  }
}

