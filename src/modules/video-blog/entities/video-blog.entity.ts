import { BaseEntity } from 'src/base/base.entity';
import { Likes } from 'src/modules/likes/entities/like.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class VideoBlog extends BaseEntity {
  @Column()
  videoUrl: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: 0 })
  postViewCount: number;

  @OneToMany(() => Likes, (like) => like.blog)
  likes: Likes[];

  @Column()
  lecturerName: string;
}
