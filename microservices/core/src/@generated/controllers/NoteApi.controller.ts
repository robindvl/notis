import { Body, Controller, Delete, Get, Post, Put, Param, Query, Req } from '@nestjs/common';
import { Observable } from 'rxjs';
import { NoteApi } from '../api';
import { Note, NoteCreate, NoteUpdate,  } from '../models';

@Controller()
export class NoteApiController {
  constructor(private readonly noteApi: NoteApi) {}

  @Post('/note')
  createNote(@Body() noteCreate: NoteCreate, @Req() request: Request): Note | Promise<Note> | Observable<Note> {
    return this.noteApi.createNote(noteCreate, request);
  }

  @Delete('/note/:id')
  deleteNote(@Param('id') id: string, @Req() request: Request): void | Promise<void> | Observable<void> {
    return this.noteApi.deleteNote(id, request);
  }

  @Get('/note/:id')
  getNote(@Param('id') id: string, @Req() request: Request): Note | Promise<Note> | Observable<Note> {
    return this.noteApi.getNote(id, request);
  }

  @Get('/note')
  getNotes(@Query('spaceId') spaceId: string, @Query('sectionId') sectionId: string, @Query('parentId') parentId: string, @Req() request: Request): Array<Note> | Promise<Array<Note>> | Observable<Array<Note>> {
    return this.noteApi.getNotes(spaceId, sectionId, parentId, request);
  }

  @Put('/note/:id')
  updateNote(@Param('id') id: string, @Body() noteUpdate: NoteUpdate, @Req() request: Request): Note | Promise<Note> | Observable<Note> {
    return this.noteApi.updateNote(id, noteUpdate, request);
  }

} 