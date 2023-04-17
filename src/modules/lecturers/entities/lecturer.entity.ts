import { BaseEntity } from 'src/base/base.entity';
import { Forum } from 'src/modules/forum/entities/forum.entity';
import { Image } from 'src/modules/image/entities/image.entity';
import { Training } from 'src/modules/training/entities';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

@Entity()
export class Lecturer extends BaseEntity {
  @Column()
  lecturerFullName: string;

  @Column()
  jobTitle: string;

  @Column()
  lecturerInfo: string;

  @Column({ nullable: true })
  lecturerInfoKG: string;

  @ManyToOne(() => Training, (training) => training.lecturers, {
    onDelete: 'CASCADE',
  })
  training: Training[];

  @OneToOne(() => Image, { cascade: true })
  @JoinColumn()
  image: Image;

  @Column({
    default: false,
  })
  isDeleted: boolean;

  @ManyToOne(() => Forum, (forum) => forum.lecturers, {
    onDelete: 'CASCADE',
  })
  forum: Forum[];
}
