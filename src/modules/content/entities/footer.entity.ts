import { BaseEntity } from 'src/base/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class ContentFooter extends BaseEntity {
  @Column()
  email: string;

  @Column()
  linkedin: string;

  @Column()
  youtube: string;

  @Column()
  instagram: string;
}
