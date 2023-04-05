import { BaseEntity } from 'src/base/base.entity';
import { Image } from 'src/modules/image/entities/image.entity';
import { Questionnaire } from 'src/modules/questionnaire/entities/questionnaire.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { UserToForum } from './users-to-forum.entity';

@Entity()
export class Forum extends BaseEntity {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  address: string;

  @OneToMany(() => Image, (image) => image.forum, {
    cascade: true,
  })
  images: Image[];

  @CreateDateColumn()
  eventDate?: Date;

  @CreateDateColumn()
  deadlineDate?: Date;

  @Column({
    nullable: true,
  })
  time: string;

  @Column({
    nullable: true,
  })
  location: string;

  @OneToOne(() => Questionnaire, (questionnaire) => questionnaire.training)
  @JoinColumn()
  questionnaire: Questionnaire;

  @OneToMany(() => UserToForum, (userToForum) => userToForum.forum)
  @JoinTable()
  userToForum: UserToForum[];
}
