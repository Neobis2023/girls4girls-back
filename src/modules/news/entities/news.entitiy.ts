import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { BaseEntity } from 'src/base/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class News extends BaseEntity {
  @Column()
  @IsNotEmpty()
  @IsString()
  title: string;

  @Column({
    nullable: true,
  })
  titleKG: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  description: string;

  @Column({
    nullable: true,
  })
  descriptionKG: string;

  @Column()
  @IsNotEmpty()
  @IsNumber()
  imageId: number;

  @Column()
  @IsNotEmpty()
  @IsNumber()
  commentId: number;

  @Column()
  @IsNotEmpty()
  @IsNumber()
  likeId: number;
}
