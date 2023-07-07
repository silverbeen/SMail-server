import { Column, Entity, Index, OneToMany } from 'typeorm';
import { UserDesk } from './UserDesk';
import { Template } from './Template';
import { Mail } from './Mail';

@Index('user_id_UNIQUE', ['userId'], { unique: true })
@Entity('user', { schema: 'smail_db' })
export class User {
  @Column('varchar', { primary: true, name: 'user_id', length: 30 })
  userId: string;

  @Column('varchar', { name: 'user_name', length: 45 })
  userName: string;

  @Column('char', { name: 'user_password', length: 60 })
  userPassword: string;

  @OneToMany(() => UserDesk, (userDesk) => userDesk.userUser)
  userDesks: UserDesk[];

  @OneToMany(() => Template, (template) => template.user)
  templates: Template[];

  @OneToMany(() => Mail, (mail) => mail.user)
  mail: Mail[];
}
