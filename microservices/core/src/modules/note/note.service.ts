import { Injectable, NotFoundException } from '@nestjs/common';
import { NoteApi } from '../../@generated/api';
import { Note, NoteCreate, NoteUpdate } from '../../@generated/models';
import { NoteRepository } from '@repo/domain';

@Injectable()
export class NoteService implements NoteApi {
  constructor(private readonly repository: NoteRepository) {}

  async getNotes(
    spaceId: string | undefined,
    sectionId: string | undefined,
    parentId: string | undefined,
    request: Request,
  ): Promise<Note[]> {
    let notes: any[];

    if (spaceId) {
      notes = await this.repository.findBySpaceId(spaceId);
    } else if (sectionId) {
      notes = await this.repository.findBySectionId(sectionId);
    } else if (parentId) {
      notes = await this.repository.findByParentId(parentId);
    } else {
      // Return empty list or throw error depending on requirements
      // For now, let's return all if no filter, or empty
      return [];
    }

    return notes.map((n) => ({
      id: n.id,
      title: n.title,
      body: n.body || '',
      emoji: n.emoji || '',
      type: n.type as any,
      parentId: n.parentId,
      sectionId: n.sectionId,
      spaceId: n.spaceId,
      content: n.content as any,
      createdAt: n.createdAt.toISOString(),
      updatedAt: n.updatedAt.toISOString(),
    }));
  }

  async createNote(noteCreate: NoteCreate, request: Request): Promise<Note> {
    const note = await this.repository.create({
      title: noteCreate.title,
      body: noteCreate.body,
      emoji: noteCreate.emoji,
      type: noteCreate.type as any,
      parentId: noteCreate.parentId,
      sectionId: noteCreate.sectionId,
      spaceId: noteCreate.spaceId,
      content: noteCreate.content as Record<string, unknown>,
    });
    return {
      id: note.id,
      title: note.title,
      body: note.body || '',
      emoji: note.emoji || '',
      type: note.type as any,
      parentId: note.parentId,
      sectionId: note.sectionId,
      spaceId: note.spaceId,
      content: note.content as any,
      createdAt: note.createdAt.toISOString(),
      updatedAt: note.updatedAt.toISOString(),
    };
  }

  async getNote(id: string, request: Request): Promise<Note> {
    const note = await this.repository.findById(id);
    if (!note) {
      throw new NotFoundException(`Note with ID ${id} not found`);
    }
    return {
      id: note.id,
      title: note.title,
      body: note.body || '',
      emoji: note.emoji || '',
      type: note.type as any,
      parentId: note.parentId,
      sectionId: note.sectionId,
      spaceId: note.spaceId,
      content: note.content as any,
      createdAt: note.createdAt.toISOString(),
      updatedAt: note.updatedAt.toISOString(),
    };
  }

  async updateNote(
    id: string,
    noteUpdate: NoteUpdate,
    request: Request,
  ): Promise<Note> {
    const note = await this.repository.update(id, noteUpdate as any);
    return {
      id: note.id,
      title: note.title,
      body: note.body || '',
      emoji: note.emoji || '',
      type: note.type as any,
      parentId: note.parentId,
      sectionId: note.sectionId,
      spaceId: note.spaceId,
      content: note.content as any,
      createdAt: note.createdAt.toISOString(),
      updatedAt: note.updatedAt.toISOString(),
    };
  }

  async deleteNote(id: string, request: Request): Promise<void> {
    await this.repository.delete(id);
  }
}

