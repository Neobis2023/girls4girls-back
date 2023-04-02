import { BaseEntity } from 'src/base/base.entity';
import { VideoBlog } from 'src/modules/video-blog/entities/video-blog.entity';
import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';

@Entity()
export class Categories extends BaseEntity {
  @Column({ unique: true })
  name: string;

  @OneToMany(() => VideoBlog, (videoBlogs) => videoBlogs.category)
  videoBlogs: VideoBlog[];
}
