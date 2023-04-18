import {
  Column,
  Entity,
  OneToOne,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { BaseEntity } from '../../../base/base.entity';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { UserRoleEnum } from '../enums/user-role.enum';
import { UserGenderEnum } from '../enums/user-gender.enum';
import { StatusEnum } from '../enums/user-status.enum';
import { Jeton } from '../../jeton/entities/jeton.entity';
import { Likes } from 'src/modules/likes/entities/like.entity';
import { Mentee } from 'src/modules/mentee/entities/mentee.entity';
import { Image } from '../../image/entities/image.entity';
import { RegionEnum } from 'src/utils/enum/region.enum';
import { UserToForum } from 'src/modules/forum/entities/users-to-forum.entity';
import { Character } from '../../character/entities/character.entity';
import { UserToTraining } from '../../training/entities/users-to-training.entity';
import { QuestionnaireResponse } from '../../questionnaire/entities/questionnaire-response.entity';
import { Feedback } from 'src/modules/feedback/entities/feedback.entity';
import { UserToMentorship } from 'src/modules/mentorship/entities/user-to-mentor.entity';
import { QuizResult } from 'src/modules/quiz/entities/quiz-results.entity';
import { VideoBlog } from '../../video-blog/entities/video-blog.entity';
import { Quiz } from '../../quiz/entities/quiz.entity';

@Entity()
export class User extends BaseEntity {
  @Column({
    unique: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  password: string;

  @Column({
    unique: true,
  })
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @Column({
    nullable: true,
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @Column({
    nullable: true,
  })
  @IsDate()
  @IsOptional()
  dateOfBirth: Date;

  @Column({
    type: 'enum',
    enum: UserGenderEnum,
    default: UserGenderEnum.FEMALE,
  })
  gender: UserGenderEnum;

  @Column({
    type: 'enum',
    enum: UserRoleEnum,
    default: UserRoleEnum.USER,
  })
  role: UserRoleEnum;

  @Column({
    type: 'enum',
    enum: StatusEnum,
    default: StatusEnum.VISITOR,
  })
  status: StatusEnum;

  @Column({
    type: 'enum',
    enum: RegionEnum,
    nullable: true,
  })
  region: RegionEnum;

  @Column({
    type: 'boolean',
    default: false,
  })
  confirmed: boolean;

  @Column({
    type: 'boolean',
    default: false,
  })
  isDeleted: boolean;

  @Column({
    type: 'boolean',
    default: false,
  })
  isBlocked: boolean;

  @OneToOne(() => Image, { cascade: true })
  @JoinColumn()
  image: Image;

  @OneToOne(() => Character, (character) => character.user, { cascade: true })
  @JoinColumn()
  character: Character;

  @ManyToMany(() => Jeton, (jeton) => jeton.users)
  @JoinTable()
  jetons: Jeton[];

  @OneToMany(() => Likes, (likes) => likes.user, { cascade: true })
  likes: Likes[];

  @OneToOne(() => Mentee, (mentee) => mentee.mentee, { cascade: true })
  @JoinColumn()
  mentee: Mentee;

  @OneToMany(() => UserToTraining, (userToTraining) => userToTraining.user, {
    cascade: true,
  })
  userToTraining: UserToTraining[];

  @OneToMany(() => QuestionnaireResponse, (response) => response.user, {
    cascade: true,
  })
  @JoinColumn()
  response: QuestionnaireResponse[];

  @OneToMany(() => UserToForum, (userToForum) => userToForum.user, {
    cascade: true,
  })
  @JoinColumn()
  userToForum: UserToForum[];

  @OneToMany(() => Feedback, (feedback) => feedback.user)
  @JoinColumn()
  feedback: Feedback[];

  @OneToMany(
    () => UserToMentorship,
    (userToMentorship) => userToMentorship.mentorship,
    {
      cascade: true,
    },
  )
  @JoinTable()
  userToMentorship: UserToMentorship[];

  @OneToMany(() => QuizResult, (quizResult) => quizResult.user, {
    cascade: true,
  })
  quizResults: QuizResult[];

  @ManyToMany(() => VideoBlog)
  @JoinTable()
  videoBlogs: VideoBlog[];

  @ManyToMany(() => Quiz)
  @JoinTable()
  passedQuizzes: Quiz[];
}
