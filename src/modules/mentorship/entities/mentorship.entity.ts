import { BaseEntity } from 'src/base/base.entity';
import { Questionnaire } from 'src/modules/questionnaire/entities/questionnaire.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { UserToMentorship } from './user-to-mentor.entity';

@Entity()
export class MentorShip extends BaseEntity {
  @Column()
  name: string;

  @Column({
    default: false,
  })
  isDeleted: boolean;

  @OneToMany(
    () => UserToMentorship,
    (userToMentorship) => userToMentorship.mentorship,
    {
      cascade: true,
    },
  )
  @JoinTable()
  userToMentorship: UserToMentorship[];

  @OneToOne(() => Questionnaire)
  @JoinColumn()
  questionnaire: Questionnaire;
}
