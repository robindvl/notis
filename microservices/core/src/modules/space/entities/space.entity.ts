import { Entity, Column, PrimaryColumn, CreateDateColumn } from 'typeorm';
import { Space as ISpace } from '@repo/domain';

@Entity('spaces')
export class SpaceEntity implements ISpace {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ default: '' })
  img: string;

  @CreateDateColumn()
  createdAt: string; // Implements ISpace, but TypeORM will set this as a Date object at runtime
}

