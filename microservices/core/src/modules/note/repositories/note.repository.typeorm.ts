import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note, NoteCreateDto, NoteRepository, NoteUpdateDto, NoteNotFoundException } from '@repo/domain';
import { NoteEntity } from '../entities/note.entity';
import { uuidv7 } from 'uuidv7';
import { NotePersistenceMapper } from '../mappers/note-persistence.mapper';

@Injectable()
export class NoteRepositoryTypeOrm extends NoteRepository {
  constructor(
    @InjectRepository(NoteEntity)
    private readonly repository: Repository<NoteEntity>,
  ) {
    super();
  }

  async findById(id: string): Promise<Note | null> {
    const entity = await this.repository.findOneBy({ id });
    return entity ? NotePersistenceMapper.toDomain(entity) : null;
  }

  async findBySpaceId(spaceId: string): Promise<Note[]> {
    const entities = await this.repository.findBy({ spaceId });
    return NotePersistenceMapper.toDomainArray(entities);
  }

  async findBySectionId(sectionId: string): Promise<Note[]> {
    const entities = await this.repository.findBy({ sectionId });
    return NotePersistenceMapper.toDomainArray(entities);
  }

  async findByParentId(parentId: string): Promise<Note[]> {
    const entities = await this.repository.findBy({ parentId });
    return NotePersistenceMapper.toDomainArray(entities);
  }

  async create(note: NoteCreateDto): Promise<Note> {
    const newNote = this.repository.create({
      ...note,
      id: uuidv7(),
    });
    
    const saved = await this.repository.save(newNote);
    return NotePersistenceMapper.toDomain(saved);
  }

  async update(id: string, data: NoteUpdateDto): Promise<Note> {
    const noteEntity = await this.repository.findOneBy({ id });
    
    if (!noteEntity) throw new NoteNotFoundException(id);

    const updatedNote = this.repository.create({
      ...noteEntity,
      ...data,
      id,
    });

    const saved = await this.repository.save(updatedNote);
    return NotePersistenceMapper.toDomain(saved);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async deleteAll(): Promise<void> {
    await this.repository.clear();
  }

  async reorder(parentId: string, noteIds: string[]): Promise<void> {
    // Basic implementation for reorder if needed
  }
}
