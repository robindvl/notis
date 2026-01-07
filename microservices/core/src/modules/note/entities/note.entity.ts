import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Note as INote } from '@repo/domain';

@Entity('notes')
export class NoteEntity implements INote {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  body?: string;

  @Column({ nullable: true })
  emoji?: string;

  @Column({
    type: 'enum',
    enum: ['note', 'section', 'paragraph', 'note_task'],
    default: 'note',
  })
  type: 'note' | 'section' | 'paragraph' | 'note_task';

  @Column({ type: 'uuid', nullable: true })
  parentId?: string;

  @Column({ type: 'uuid', nullable: true })
  sectionId?: string;

  @Column({ type: 'uuid' })
  spaceId: string;

  @Column({ type: 'jsonb', nullable: true })
  content?: Record<string, unknown>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

