import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { BaseEntity } from 'src/base/base.entity';
import { Image } from 'src/modules/image/entities/image.entity';
import { Column, CreateDateColumn, Entity, OneToMany } from 'typeorm';

@Entity()
export class Forum extends BaseEntity {
  @Column()
  @IsString()
  @IsNotEmpty()
  title: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  description: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  address: string;

  @OneToMany(() => Image, (image) => image.forum, {
    cascade: true,
  })
  @IsOptional()
  image: Image[];

  @CreateDateColumn()
  endDate?: Date;
}
