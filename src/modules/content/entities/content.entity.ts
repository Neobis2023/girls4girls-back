import { BaseEntity } from 'src/base/base.entity';
import { Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { ContentStatistics } from './statistics.entity';
import { ContentFooter } from './footer.entity';
import { AskingQuestions } from './ask-questions.entity';

@Entity()
export class Content extends BaseEntity {
  @OneToOne(() => ContentStatistics, { cascade: true })
  @JoinColumn()
  statistics: ContentStatistics;

  @OneToOne(() => ContentFooter, { cascade: true })
  @JoinColumn()
  footer: ContentFooter;

  @OneToMany(() => AskingQuestions, (questions) => questions.content, {
    cascade: true,
  })
  questions: AskingQuestions[];
}
