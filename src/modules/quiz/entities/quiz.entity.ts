import { Entity, Column, OneToMany, OneToOne } from 'typeorm';
import { Question } from './question.entity';
import { BaseEntity } from 'src/base/base.entity';
import { VideoBlog } from 'src/modules/video-blog/entities/video-blog.entity';

@Entity('quizes')
export class Quiz extends BaseEntity {
  @Column({ length: 500 })
  title: string;

  @Column('text')
  description: string;

  @Column({
    type: 'boolean',
    default: 1,
  })
  isActive: boolean;

  @OneToMany(() => Question, (question) => question.quiz, { cascade: true })
  questions: Question[];

  @OneToMany(() => VideoBlog, (videoBlog) => videoBlog.quiz, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  videoBlog: VideoBlog;
}
