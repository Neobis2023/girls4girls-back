import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../base/base.entity';
import { ApplyStatus } from '../../../utils/enum/apply-status.enum';
import { User } from '../../user/entities/user.entity';
import { Forum } from './forum.entity';
@Entity()
export class UserToForum extends BaseEntity {
  @Column({
    type: 'enum',
    enum: ApplyStatus,
    default: ApplyStatus.PENDING,
    name: 'apply_status',
  })
  applyStatus: ApplyStatus;

  @ManyToOne(() => User, (user) => user.userToForum, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Forum, (forum) => forum.userToForum, {
    cascade: true,
  })
  forum: Forum;
  
}
