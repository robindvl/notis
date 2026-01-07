import { Entity, Column, PrimaryColumn, CreateDateColumn } from 'typeorm';
import { Space as ISpace } from '@repo/domain';

@Entity('spaces')
export class SpaceEntity implements ISpace {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  img?: string;

  @CreateDateColumn()
  createdAt: Date;
}

