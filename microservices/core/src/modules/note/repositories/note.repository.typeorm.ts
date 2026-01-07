import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note, NoteCreateDto, NoteRepository, NoteUpdateDto, NoteNotFoundException } from '@repo/domain';
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

  async create(note: NoteCreateDto): Promise<Note> {
    const newNote = this.repository.create({
      ...note,
      id: uuidv7(),
    });
    
    return this.repository.save(newNote);
  }

  async update(id: string, data: NoteUpdateDto): Promise<Note> {
    const note = await this.findById(id);
    
    if (!note) throw new NoteNotFoundException(id);

    const updatedNote = this.repository.create({
      ...note,
      ...data,
      id,
    });

    return this.repository.save(updatedNote);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async reorder(parentId: string, noteIds: string[]): Promise<void> {
    // Basic implementation for reorder if needed
  }
}