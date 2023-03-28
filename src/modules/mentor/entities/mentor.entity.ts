import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { BaseEntity } from 'src/base/base.entity';
import { Mentee } from 'src/modules/mentee/entities/mentee.entity';
import { Training } from 'src/modules/training/entities/training.entity';
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';

@Entity()
export class Mentor extends BaseEntity {
  @Column()
  @IsNotEmpty()
  @IsString()
  mentorName: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  jobTitle: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  info: string;

  @OneToMany(() => Mentee, (mentee) => mentee.mentor)
  mentees: Mentee[];

  @ManyToMany(()=>Training,(training)=>training.mentor)
  @IsOptional()
  @JoinTable()
  training: Training[]
}
