import { BaseEntity } from 'src/base/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class ContentStatistics extends BaseEntity {
  @Column()
  trainigs: string;

  @Column()
  graduates: string;

  @Column()
  regions: string;
}
