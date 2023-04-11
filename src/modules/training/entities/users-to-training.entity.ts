import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { BaseEntity } from '../../../base/base.entity';
import { ApplyStatus } from '../../../utils/enum/apply-status.enum';
import { User } from '../../user/entities/user.entity';
import { Training } from './training.entity';
import { QuestionnaireResponse } from '../../questionnaire/entities/questionnaire-response.entity';

@Entity()
export class UserToTraining extends BaseEntity {
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

  @ManyToOne(() => User, (user) => user.userToTraining, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Training, (training) => training.userToTraining, {
    onDelete: 'CASCADE',
  })
  training: Training;
}
