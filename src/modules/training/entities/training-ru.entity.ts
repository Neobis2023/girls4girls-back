import { BaseEntity } from 'src/base/base.entity';
import { Column, Entity, JoinTable, OneToOne } from 'typeorm';
import { Training } from './training.entity';

@Entity()
export class TrainingRuEntity extends BaseEntity {
  @Column()
  training_id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @OneToOne(() => Training, (training) => training.ru)
  @JoinTable()
  training: Training;
}
