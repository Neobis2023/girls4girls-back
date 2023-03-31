import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import { BaseEntity } from 'src/base/base.entity';
import { Categories } from 'src/modules/categories/entities/category.entity';
import { Image } from 'src/modules/image/entities/image.entity';
import { Likes } from 'src/modules/likes/entities/like.entity';
import { Column, Entity, JoinColumn, ManyToMany, OneToMany } from 'typeorm';

@Entity()
export class VideoBlog extends BaseEntity {
  @Column()
  @IsNotEmpty()
  @IsUrl()
  videoUrl: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  title: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  description: string;

  @Column({ default: 0 })
  @IsNotEmpty()
  @IsNumber()
  postViewCount: number;

  @Column()
  @IsNotEmpty()
  @IsString()
  lecturerName: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  lecturerInfo: string;

  @OneToMany(() => Image, (image) => image.videoBlog, { cascade: true })
  @JoinColumn({ name: 'id' })
  @IsNotEmpty()
  lecturerImage: Image[];

  @OneToMany(() => Likes, (like) => like.blog, { cascade: true })
  @IsOptional()
  likes: Likes[];

  @ManyToMany(() => Categories, (category) => category.videoBlog)
  @IsNotEmpty()
  category: Categories[];
}
