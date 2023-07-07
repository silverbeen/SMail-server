import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User';

@Index('template_UNIQUE', ['templateId'], { unique: true })
@Index('fk_template_user1_idx', ['userId'], {})
@Entity('template', { schema: 'smail_db' })
export class Template {
  @PrimaryGeneratedColumn({ type: 'int', name: 'template_id', unsigned: true })
  templateId: number;

  @Column('varchar', { name: 'user_id', length: 30 })
  userId: string;

  @Column('varchar', { name: 'template_title', length: 100 })
  templateTitle: string;

  @Column('varchar', { name: 'template_content', length: 255 })
  templateContent: string;

  @ManyToOne(() => User, (user) => user.templates, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'userId' }])
  user: User;
}
