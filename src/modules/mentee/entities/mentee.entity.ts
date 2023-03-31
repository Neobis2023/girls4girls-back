import { IsNotEmpty } from 'class-validator';
import { BaseEntity } from 'src/base/base.entity';
import { Mentor } from 'src/modules/mentor/entities/mentor.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Entity, JoinColumn, OneToOne, ManyToOne } from 'typeorm';

@Entity()
export class Mentee extends BaseEntity {
  @OneToOne(() => User, (user) => user.id)
  @JoinColumn()
  mentee: User;

  @ManyToOne(() => Mentor, (mentor) => mentor.mentees)
  @JoinColumn()
  @IsNotEmpty()
  mentor: Mentor;
}
