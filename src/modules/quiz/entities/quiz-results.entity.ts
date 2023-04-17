import { BaseEntity } from 'src/base/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { Quiz } from './quiz.entity';
import { User } from 'src/modules/user/entities/user.entity';

@Entity()
export class QuizResult extends BaseEntity {
  @Column()
  questions: number;

  @Column()
  correctAnwers: number;

  @OneToOne(() => Quiz)
  @JoinColumn()
  quiz: Quiz;

  @ManyToOne(() => User, (user) => user.quizResults, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: User;
}
