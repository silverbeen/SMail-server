import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User';
import { DeskContent } from './DeskContent';

@Index('user_desk_id_UNIQUE', ['userDeskId'], { unique: true })
@Index('fk_user_desk_user1_idx', ['userUserId'], {})
@Entity('user_desk', { schema: 'smail_db' })
export class UserDesk {
  constructor(userId?: string) {
    this.userUserId = userId;
  }

  @PrimaryGeneratedColumn({ type: 'int', name: 'user_desk_id', unsigned: true })
  userDeskId: number;

  @Column('varchar', { name: 'user_user_id', length: 30 })
  userUserId: string;

  @ManyToOne(() => User, (user) => user.userDesks, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'user_user_id', referencedColumnName: 'userId' }])
  userUser: User;

  @OneToMany(() => DeskContent, (deskContent) => deskContent.userDesk)
  deskContents: DeskContent[];
}
