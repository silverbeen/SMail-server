import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './Category';

@Index('category_id_UNIQUE', ['categoryListId'], { unique: true })
@Entity('category_list', { schema: 'smail_db' })
export class CategoryList {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'category_list_id',
    unsigned: true,
  })
  categoryListId: number;

  @Column('varchar', { name: 'title', length: 30 })
  title: string;

  @OneToMany(() => Category, (category) => category.category)
  categories: Category[];
}
