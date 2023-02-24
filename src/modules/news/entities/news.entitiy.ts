import { BaseEntity } from 'src/base/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class NewsEntity extends BaseEntity {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  imageId: number;

  @Column()
  commentId: number;

  @Column()
  likeId: number;
}
