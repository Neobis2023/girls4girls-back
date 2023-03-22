import { BaseEntity } from 'src/base/base.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { VideoBlog } from 'src/modules/video-blog/entities/video-blog.entity';
import { Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Likes extends BaseEntity {
  @ManyToOne(() => VideoBlog, (blog) => blog.likes)
  @JoinColumn({ name: 'blogId', referencedColumnName: 'id' })
  blog: VideoBlog;

  @ManyToOne(() => User, (user) => user.likes)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: User;
}
