import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../base/base.entity';
import { IsString } from 'class-validator';
import { Training } from 'src/modules/training/entities/training.entity';
import { Forum } from 'src/modules/forum/entities/forum.entity';
import { VideoBlog } from 'src/modules/video-blog/entities/video-blog.entity';
import { CharacterImage } from '../../character/entities/character-image.entity';

@Entity()
export class Image extends BaseEntity {
  @Column()
  @IsString()
  url: string;

  @IsString()
  publicId: string;

  @ManyToOne(() => Training, (training) => training.images, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'trainingId' })
  training: Training[];

  @ManyToOne(() => Forum, (forum) => forum.images, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  forum: Forum[];

  @ManyToOne(() => VideoBlog, (videoBlog) => videoBlog.lecturerImage, {
    onDelete: 'CASCADE',
  })
  videoBlog: VideoBlog[];

  @ManyToOne(() => CharacterImage, (characterImage) => characterImage.images , {
    onDelete: 'CASCADE',
  })
  characterImage: CharacterImage;
}
