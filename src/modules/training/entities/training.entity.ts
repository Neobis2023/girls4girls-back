import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { BaseEntity } from 'src/base/base.entity';
import { Image } from 'src/modules/image/entities/image.entity';
import { Mentee } from 'src/modules/mentee/entities/mentee.entity';
import { Mentor } from 'src/modules/mentor/entities/mentor.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
} from 'typeorm';

@Entity()
export class Training extends BaseEntity {
  @Column({ type: 'varchar', nullable: true })
  @IsNotEmpty()
  @IsString()
  title: string;

  @Column({ type: 'text', nullable: true })
  @IsNotEmpty()
  description: string;

  @Column({ type: 'text' })
  @IsNotEmpty()
  @IsString()
  address: string;

  @OneToMany(() => Image, (image) => image.training, {
    cascade: true,
  })
  @JoinColumn({ name: 'id' })
  @IsOptional()
  image: Image[];

  @CreateDateColumn()
  endDate?: Date;

  @ManyToMany(()=>Mentor,(mentor)=>mentor.trainind)
  @IsOptional()
  @JoinTable()
  mentor: Mentor[]

  @ManyToMany(()=>Mentee,(mentee)=>mentee.training)
  @JoinTable()
  mentee: Mentee[]
}
