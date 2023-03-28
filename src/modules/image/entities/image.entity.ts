import { Column, Entity,JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../base/base.entity';
import { IsString } from 'class-validator';
import { Training } from 'src/modules/training/entities/training.entity';
import { Forum } from 'src/modules/forum/entities/forum.entity';

@Entity()
export class Image extends BaseEntity {
  @Column()
  @IsString()
  url: string;

  @IsString()
  publicId: string;

  @ManyToOne(() => Training, (training) => training.image, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  @JoinColumn({name: 'trainingId'})
  training: Training[];

  @ManyToOne(() => Forum, (forum) => forum.image, {
    onDelete: 'CASCADE',
    onUpdate:'CASCADE'
  })
  forum: Forum[];
}
