import { IsNotEmpty, IsString } from "class-validator";
import { BaseEntity } from "src/base/base.entity";
import { MentorEntity } from "src/modules/mentor/entities/mentor.entity";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity()
export class MenteeEntity extends BaseEntity{
    @Column()
    @IsString()
    @IsNotEmpty()
    menteeName: string;

    @ManyToOne(() => MentorEntity, (mentor) => mentor.mentees)
    @IsNotEmpty()
    mentor: MentorEntity;
}

