import { IsNotEmpty, IsString } from 'class-validator';
import { BaseEntity } from 'src/base/base.entity';
import { Mentee } from 'src/modules/mentee/entities/mentee.entity';
import { Column, Entity, OneToMany } from 'typeorm';

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
}
