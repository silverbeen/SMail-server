import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User';

@Index('mail_id_UNIQUE', ['mailId'], { unique: true })
@Index('fk_mail_user1_idx', ['userId'], {})
@Entity('mail', { schema: 'smail_db' })
export class Mail {
  @PrimaryGeneratedColumn({ type: 'int', name: 'mail_id', unsigned: true })
  mailId: number;

  @Column('varchar', { name: 'user_id', length: 30 })
  userId: string;

  @Column('varchar', { name: 'mail_content', length: 500 })
  mailContent: string;

  @Column('varchar', { name: 'mail_title', length: 50 })
  mailTitle: string;

  @ManyToOne(() => User, (user) => user.mail, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'userId' }])
  user: User;
}
