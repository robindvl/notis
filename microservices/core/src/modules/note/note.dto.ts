import { Note as NoteModel } from '../../@generated/models';

export class NoteResponseDto implements NoteModel {
  id: string;
  title: string;
  body?: string;
  emoji?: string;
  type: NoteModel.TypeEnum;
  parentId?: string;
  sectionId?: string;
  spaceId: string;
  content?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}
