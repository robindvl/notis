import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Note, NoteCreate, NoteUpdate,  } from '../models';


@Injectable()
export abstract class NoteApi {

  abstract createNote(noteCreate: NoteCreate,  request: Request): Note | Promise<Note> | Observable<Note>;


  abstract deleteNote(id: string,  request: Request): void | Promise<void> | Observable<void>;


  abstract getNote(id: string,  request: Request): Note | Promise<Note> | Observable<Note>;


  abstract getNotes(spaceId: string, sectionId: string, parentId: string,  request: Request): Array<Note> | Promise<Array<Note>> | Observable<Array<Note>>;


  abstract updateNote(id: string, noteUpdate: NoteUpdate,  request: Request): Note | Promise<Note> | Observable<Note>;

} 