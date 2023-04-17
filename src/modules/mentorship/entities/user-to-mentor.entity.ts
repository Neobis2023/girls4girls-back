import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { BaseEntity } from '../../../base/base.entity';
import { ApplyStatus } from '../../../utils/enum/apply-status.enum';
import { User } from '../../user/entities/user.entity';
import { MentorShip } from './mentorship.entity';
import { QuestionnaireResponse } from 'src/modules/questionnaire/entities/questionnaire-response.entity';
@Entity()
export class UserToMentorship extends BaseEntity {
  @Column({
    type: 'enum',
    enum: ApplyStatus,
    default: ApplyStatus.PENDING,
    name: 'apply_status',
  })
  applyStatus: ApplyStatus;

  @OneToOne(() => QuestionnaireResponse)
  @JoinColumn()
  questionnaireResponse: QuestionnaireResponse;

  @ManyToOne(() => User, (user) => user.userToMentorship, {
    onDelete: 'CASCADE',
  })
  user: User;

  @ManyToOne(() => MentorShip, (mentorship) => mentorship.userToMentorship, {
    onDelete: 'CASCADE',
  })
  mentorship: MentorShip;
}
