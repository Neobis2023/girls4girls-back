import { BaseEntity } from 'src/base/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class ContentStatistics extends BaseEntity {
  @Column()
  trainings: string;

  @Column()
  graduates: string;

  @Column()
  regions: string;
}
