import { BaseEntity } from 'src/base/base.entity';
import { Questionnaire } from 'src/modules/questionnaire/entities/questionnaire.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity()
export class MentorShip extends BaseEntity {
  @Column()
  name: string;

  @OneToOne(() => Questionnaire)
  @JoinColumn()
  questionnaire: Questionnaire;
}
