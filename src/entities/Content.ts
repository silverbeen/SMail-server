import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './Category';
import { DeskContent } from './DeskContent';

@Index('content_id_UNIQUE', ['contentId'], { unique: true })
@Index('fk_content_category1_idx', ['fieldId'], {})
@Entity('content', { schema: 'smail_db' })
export class Content {
  @PrimaryGeneratedColumn({ type: 'int', name: 'content_id', unsigned: true })
  contentId: number;

  @Column('int', { name: 'field_id', unsigned: true })
  fieldId: number;

  @Column('varchar', { name: 'content', length: 255 })
  content: string;

  @ManyToOne(() => Category, (category) => category.contents, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'field_id', referencedColumnName: 'fieldId' }])
  field: Category;

  @OneToMany(() => DeskContent, (deskContent) => deskContent.content)
  deskContents: DeskContent[];
}
