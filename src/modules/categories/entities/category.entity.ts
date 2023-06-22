import { BaseEntity } from 'src/base/base.entity';
import { VideoBlog } from 'src/modules/video-blog/entities/video-blog.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Categories extends BaseEntity {
  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  nameKG: string;

  @OneToMany(() => VideoBlog, (videoBlogs) => videoBlogs.category)
  videoBlogs: VideoBlog[];
}
