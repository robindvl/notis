import { Injectable } from '@nestjs/common';
import { Note, NoteRepository } from '@repo/domain';
import { Configuration, NoteApi } from '../../../@generated/core.api';

@Injectable()
export class NoteRepositoryRemote extends NoteRepository {
  private readonly coreApi: NoteApi;

  constructor() {
    super();
    const config = new Configuration({
      basePath: process.env.CORE_SERVICE_URL || 'http://127.0.0.1:5002',
    });
    this.coreApi = new NoteApi(config);
  }

  async findById(id: string): Promise<Note | null> {
    try {
      const data = await this.coreApi.getNote({ id });
      return this.mapToNote(data);
    } catch (e) {
      return null;
    }
  }

  async findBySpaceId(spaceId: string): Promise<Note[]> {
    const data = await this.coreApi.getNotes({ spaceId });
    return data.map((n: any) => this.mapToNote(n));
  }

  async findBySectionId(sectionId: string): Promise<Note[]> {
    const data = await this.coreApi.getNotes({ sectionId });
    return data.map((n: any) => this.mapToNote(n));
  }

  async findByParentId(parentId: string): Promise<Note[]> {
    const data = await this.coreApi.getNotes({ parentId });
    return data.map((n: any) => this.mapToNote(n));
  }

  async create(note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>): Promise<Note> {
    const data = await this.coreApi.createNote({
      noteCreate: note as any,
    });
    return this.mapToNote(data);
  }

  async update(id: string, note: Partial<Note>): Promise<Note> {
    const data = await this.coreApi.updateNote({
      id,
      noteUpdate: note as any,
    });
    return this.mapToNote(data);
  }

  async delete(id: string): Promise<void> {
    await this.coreApi.deleteNote({ id });
  }

  async reorder(parentId: string, noteIds: string[]): Promise<void> {
    // Current @core API doesn't have reorder endpoint
  }

  private mapToNote(data: any): Note {
    return {
      ...data,
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt),
    };
  }
}

