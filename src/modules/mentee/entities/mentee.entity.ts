import { IsNotEmpty, IsString } from 'class-validator';
import { BaseEntity } from 'src/base/base.entity';
import { Mentor } from 'src/modules/mentor/entities/mentor.entity';
import { Training } from 'src/modules/training/entities/training.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';

@Entity()
export class Mentee extends BaseEntity {
  @Column()
  @IsString()
  @IsNotEmpty()
  menteeName: string;

  @ManyToOne(() => Mentor, (mentor) => mentor.mentees)
  @IsNotEmpty()
  mentor: Mentor;

  @ManyToMany(()=>Training,(training)=>training.mentee)
  @JoinTable()
  training: Training[]
}
