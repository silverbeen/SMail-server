import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Content } from './Content';
import { UserDesk } from './UserDesk';

@Index('desk_content_id_UNIQUE', ['deskContentId'], { unique: true })
@Index('fk_desk_content_content1_idx', ['contentId'], {})
@Index('fk_desk_content_user_desk1', ['userDeskId'], {})
@Entity('desk_content', { schema: 'smail_db' })
export class DeskContent {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'desk_content_id',
    unsigned: true,
  })
  deskContentId: number;

  @Column('int', { name: 'user_desk_id', unsigned: true })
  userDeskId: number;

  @Column('int', { name: 'content_id', unsigned: true })
  contentId: number;

  @ManyToOne(() => UserDesk, (userDesk) => userDesk.deskContents, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'user_desk_id', referencedColumnName: 'userDeskId' })
  userDesk: UserDesk;

  @ManyToOne(() => Content, (content) => content.deskContents, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'content_id', referencedColumnName: 'contentId' })
  content: Content;
}
