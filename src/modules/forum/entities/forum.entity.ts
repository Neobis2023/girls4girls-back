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
import { Lecturer } from 'src/modules/lecturers/entities/lecturer.entity';

@Entity()
export class Forum extends BaseEntity {
  @Column()
  title: string;

  @Column({ nullable: true })
  titleKG: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  descriptionKG: string;

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

  @Column({
    nullable: true,
  })
  locationKG: string;

  @Column({
    default: false,
  })
  isDeleted: boolean;

  @OneToOne(() => Questionnaire, (questionnaire) => questionnaire.training)
  @JoinColumn()
  questionnaire: Questionnaire;

  @OneToMany(() => UserToForum, (userToForum) => userToForum.forum, {
    cascade: true,
  })
  @JoinTable()
  userToForum: UserToForum[];

  @OneToMany(() => Lecturer, (lecturer) => lecturer.forum, {
    cascade: true,
  })
  @JoinColumn()
  lecturers: Lecturer[];
}
