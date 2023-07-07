import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CategoryList } from './CategoryList';
import { Content } from './Content';

@Index('field_id_UNIQUE', ['fieldId'], { unique: true })
@Index('fk_category_category_list_idx', ['categoryId'], {})
@Entity('category', { schema: 'smail_db' })
export class Category {
  @PrimaryGeneratedColumn({ type: 'int', name: 'field_id', unsigned: true })
  fieldId: number;

  @Column('int', { name: 'category_id', unsigned: true })
  categoryId: number;

  @Column('varchar', { name: 'field_name', length: 45 })
  fieldName: string;

  @ManyToOne(() => CategoryList, (categoryList) => categoryList.categories, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'category_id', referencedColumnName: 'categoryListId' }])
  category: CategoryList;

  @OneToMany(() => Content, (content) => content.field)
  contents: Content[];
}
